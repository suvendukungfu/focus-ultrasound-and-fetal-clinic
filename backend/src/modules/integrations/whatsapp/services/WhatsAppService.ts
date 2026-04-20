import { Logger } from '../../../../core/Logger';

export class WhatsAppService {
  private get phoneNumberId() { return process.env.WHATSAPP_PHONE_NUMBER_ID; }
  private get accessToken() { return process.env.WHATSAPP_ACCESS_TOKEN; }

  async sendMessage(to: string, message: string): Promise<boolean> {
    if (!this.phoneNumberId || !this.accessToken) {
      Logger.warn('[WhatsAppService] WhatsApp API not configured. Skipping message.');
      return false;
    }

    // Senior Developer Polish: Ensure country code for India if missing (10 digits)
    let cleanTo = to.replace(/[^0-9]/g, '');
    if (cleanTo.length === 10) {
      cleanTo = `91${cleanTo}`;
    }

    try {
      const response = await fetch(
        `https://graph.facebook.com/v18.0/${this.phoneNumberId}/messages`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.accessToken}`,
          },
          body: JSON.stringify({
            messaging_product: 'whatsapp',
            to: cleanTo,
            type: 'text',
            text: { body: message },
          }),
        }
      );

      const data = await response.json();
      if (!response.ok) {
        Logger.error(`[WhatsAppService] Failed to send message: ${JSON.stringify(data)}`);
        return false;
      }

      Logger.info(`[WhatsAppService] Message sent successfully to ${to}`);
      return true;
    } catch (error) {
      Logger.error(`[WhatsAppService] Error sending message:`, error);
      return false;
    }
  }
}

export const whatsappService = new WhatsAppService();
