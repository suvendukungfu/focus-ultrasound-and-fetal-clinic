import { Logger } from '../../../core/Logger';
import { prisma } from '../../../shared/infra/database/prismaClient';
import { EventBus } from '../../../events/EventBus';
import { IKernelService } from '../../../kernel/ServiceRegistry';

/**
 * LeadReplyService — AI-powered CRM reply suggestion engine
 * 
 * Generates professional, empathetic reply suggestions for patient leads.
 * Uses OpenAI when available, otherwise applies template-based reply trees.
 */
export class LeadReplyService implements IKernelService {
  name = 'LeadReplyService';
  private apiKey: string | undefined;

  // Template reply trees for offline mode
  private readonly REPLY_TEMPLATES: Record<string, string[]> = {
    urgent: [
      'Thank you for reaching out. We understand this is urgent. Our fetal medicine specialist is available today for priority consultations. Would you prefer a morning or afternoon slot?',
      'We have received your inquiry marked as high priority. Our clinic coordinator will call you within the next 30 minutes to arrange an immediate appointment.',
    ],
    scan_inquiry: [
      'Thank you for your interest in our scanning services. We offer Level II anomaly scans, 3D/4D imaging, and fetal echocardiography. Would you like to book a consultation to determine which scan is most appropriate for your stage of pregnancy?',
      'We appreciate your inquiry. Our fetal imaging center offers comprehensive scan packages. Shall I share the pricing details and available appointment slots?',
    ],
    pricing: [
      'Thank you for your inquiry about our pricing. Our consultation fees and scan packages are designed to provide comprehensive care at competitive rates. I would be happy to share a detailed breakdown. Could you let us know which services you are interested in?',
    ],
    general: [
      'Thank you for contacting Focus Ultrasound and Fetal Clinic. We would love to assist you. Could you please share a bit more about what you are looking for so we can connect you with the right specialist?',
      'Thank you for reaching out! Our team is here to help with any questions about fetal imaging and prenatal care. How can we assist you today?',
    ],
  };

  async init() {
    this.apiKey = process.env.OPENAI_API_KEY;
    Logger.info(`[${this.name}] Initialized. Mode: ${this.apiKey ? 'OpenAI' : 'TemplateTree'}`);
  }

  async start() { Logger.info(`[${this.name}] Lead Reply Suggestion Engine online.`); }
  async stop() { Logger.info(`[${this.name}] Shutting down.`); }
  async health() { return { status: 'ONLINE' as const }; }

  /**
   * Generate professional reply suggestions for a patient lead.
   */
  async suggestReply(input: { leadId: string; name: string; message: string; priorityScore: number }): Promise<{
    suggestions: string[];
    intent: string;
    tone: string;
    tokensUsed: number;
  }> {
    try {
      if (this.apiKey) {
        return await this.suggestWithOpenAI(input);
      }
      return this.suggestWithTemplates(input);
    } catch (err) {
      Logger.error(`[${this.name}] Reply generation failed: ${err}`);
      return this.suggestWithTemplates(input);
    }
  }

  private async suggestWithOpenAI(input: { leadId: string; name: string; message: string; priorityScore: number }) {
    const prompt = `You are a patient communication specialist at Focus Ultrasound and Fetal Clinic.

A patient named "${input.name}" sent this inquiry:
"${input.message}"

Their AI priority score is ${input.priorityScore}/100.

Generate 3 professional, empathetic reply options. Each reply should:
- Address the patient by name
- Be warm but professional
- Be medically appropriate (no diagnoses)
- Include a clear call-to-action (book appointment, call the clinic, etc.)
- Be 2-3 sentences long

Return JSON:
{
  "suggestions": ["reply1", "reply2", "reply3"],
  "intent": "detected intent category",
  "tone": "recommended tone"
}`;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.6,
        max_tokens: 600,
        response_format: { type: 'json_object' },
      }),
    });

    const data = await response.json();
    const tokensUsed = data.usage?.total_tokens || 0;
    const parsed = JSON.parse(data.choices[0].message.content);

    await prisma.aIProviderStats.create({
      data: {
        providerName: 'OpenAI', modelUsed: 'gpt-4o-mini', tokensUsed,
        costEstimate: (tokensUsed / 1000) * 0.0003, successful: true,
        region: process.env.REGION || 'GLOBAL-1',
      },
    });

    EventBus.emit('ai.completed', { jobId: `reply-${input.leadId}`, provider: 'OpenAI', status: 'SUCCESS' });

    return { ...parsed, tokensUsed };
  }

  private suggestWithTemplates(input: { leadId: string; name: string; message: string; priorityScore: number }) {
    const msg = input.message.toLowerCase();
    let intent = 'general';
    let tone = 'Warm & Professional';

    // Intent detection via keyword matching
    const urgentKeywords = ['bleeding', 'pain', 'urgent', 'emergency', 'immediately'];
    const scanKeywords = ['scan', 'ultrasound', '3d', '4d', 'echo', 'anomaly', 'level ii', 'level 2'];
    const priceKeywords = ['price', 'cost', 'fee', 'charge', 'rate', 'package'];

    if (urgentKeywords.some(kw => msg.includes(kw)) || input.priorityScore >= 80) {
      intent = 'urgent';
      tone = 'Urgent & Empathetic';
    } else if (scanKeywords.some(kw => msg.includes(kw))) {
      intent = 'scan_inquiry';
      tone = 'Informative & Helpful';
    } else if (priceKeywords.some(kw => msg.includes(kw))) {
      intent = 'pricing';
      tone = 'Transparent & Professional';
    }

    const templates = this.REPLY_TEMPLATES[intent] || this.REPLY_TEMPLATES.general;

    // Personalise templates with patient name
    const suggestions = templates.map(t =>
      `Dear ${input.name}, ${t}`
    );

    Logger.info(`[${this.name}] Generated ${suggestions.length} template replies for Lead ${input.leadId} (intent: ${intent}).`);

    return { suggestions, intent, tone, tokensUsed: 0 };
  }
}

export const leadReplyService = new LeadReplyService();
