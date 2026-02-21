import { Router, Request, Response } from 'express';
import { Logger } from '../../../../core/Logger';
import { prisma } from '../../database/prismaClient';
import { EventBus } from '../../../../events/EventBus';

const whatsappRoutes = Router();

/**
 * GET /api/v1/integrations/whatsapp/webhook
 * WhatsApp Cloud API verification challenge endpoint.
 */
whatsappRoutes.get('/webhook', (req: Request, res: Response) => {
  const VERIFY_TOKEN = process.env.WHATSAPP_VERIFY_TOKEN || 'focus_clinic_verify';

  const mode = req.query['hub.mode'] as string;
  const token = req.query['hub.verify_token'] as string;
  const challenge = req.query['hub.challenge'] as string;

  if (mode === 'subscribe' && token === VERIFY_TOKEN) {
    Logger.info('[WhatsApp] Webhook verification successful.');
    return res.status(200).send(challenge);
  }

  Logger.warn('[WhatsApp] Webhook verification failed. Token mismatch.');
  return res.status(403).json({ error: 'Verification failed' });
});

/**
 * POST /api/v1/integrations/whatsapp/webhook
 * Receives incoming messages from WhatsApp Cloud API.
 */
whatsappRoutes.post('/webhook', async (req: Request, res: Response) => {
  try {
    const body = req.body;

    if (body.object !== 'whatsapp_business_account') {
      return res.sendStatus(404);
    }

    const entries = body.entry || [];
    for (const entry of entries) {
      const changes = entry.changes || [];
      for (const change of changes) {
        if (change.field !== 'messages') continue;

        const messages = change.value?.messages || [];
        for (const message of messages) {
          const from = message.from; // sender phone number
          const text = message.text?.body || '';
          const timestamp = new Date(parseInt(message.timestamp) * 1000);

          Logger.info(`[WhatsApp] Incoming from ${from}: "${text.substring(0, 100)}"`);

          // Auto-create a lead from the WhatsApp message
          const lead = await prisma.lead.create({
            data: {
              name: `WhatsApp (+${from})`,
              phone: from,
              message: text,
              source: 'WHATSAPP',
            },
          });

          // Emit for AI Lead Scoring
          EventBus.emit('lead.created', lead);

          Logger.info(`[WhatsApp] Lead ${lead.id} created from WhatsApp message.`);
        }
      }
    }

    // WhatsApp requires 200 within 20 seconds
    return res.sendStatus(200);
  } catch (err) {
    Logger.error(`[WhatsApp] Webhook processing error: ${err}`);
    return res.sendStatus(200); // Always return 200 to avoid retries
  }
});

/**
 * POST /api/v1/integrations/whatsapp/send
 * Send a message via WhatsApp Cloud API.
 */
whatsappRoutes.post('/send', async (req: Request, res: Response) => {
  try {
    const { to, message } = req.body;
    if (!to || !message) {
      return res.status(400).json({ error: 'to and message are required.' });
    }

    const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;
    const accessToken = process.env.WHATSAPP_ACCESS_TOKEN;

    if (!phoneNumberId || !accessToken) {
      return res.status(503).json({ error: 'WhatsApp API not configured. Set WHATSAPP_PHONE_NUMBER_ID and WHATSAPP_ACCESS_TOKEN.' });
    }

    const response = await fetch(
      `https://graph.facebook.com/v18.0/${phoneNumberId}/messages`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          messaging_product: 'whatsapp',
          to,
          type: 'text',
          text: { body: message },
        }),
      }
    );

    const data = await response.json();
    Logger.info(`[WhatsApp] Message sent to ${to}: ${JSON.stringify(data)}`);

    return res.status(200).json({ status: 'SUCCESS', data });
  } catch (err) {
    Logger.error(`[WhatsApp] Send failed: ${err}`);
    return res.status(500).json({ error: 'Failed to send message.' });
  }
});

export { whatsappRoutes };
