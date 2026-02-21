import { Logger } from '../../../core/Logger';
import { prisma } from '../../../shared/infra/database/prismaClient';
import { EventBus } from '../../../events/EventBus';
import { IKernelService } from '../../../kernel/ServiceRegistry';

/**
 * MetaDescriptionService — AI-powered SEO meta description writer
 * 
 * Generates optimized meta descriptions for blog posts and pages.
 * Uses OpenAI when available, otherwise applies NLP heuristic extraction.
 */
export class MetaDescriptionService implements IKernelService {
  name = 'MetaDescriptionService';
  private apiKey: string | undefined;

  async init() {
    this.apiKey = process.env.OPENAI_API_KEY;
    Logger.info(`[${this.name}] Initialized. Mode: ${this.apiKey ? 'OpenAI' : 'Heuristic'}`);
  }

  async start() { Logger.info(`[${this.name}] Meta Description Writer is online.`); }
  async stop() { Logger.info(`[${this.name}] Shutting down.`); }
  async health() { return { status: 'ONLINE' as const }; }

  /**
   * Generate an SEO-optimized meta description from content.
   */
  async generate(input: { title: string; content: string; targetKeywords?: string[] }): Promise<{
    metaDescription: string;
    charCount: number;
    seoScore: number;
    tokensUsed: number;
  }> {
    try {
      if (this.apiKey) {
        return await this.generateWithOpenAI(input);
      }
      return this.generateWithHeuristic(input);
    } catch (err) {
      Logger.error(`[${this.name}] Generation failed: ${err}`);
      return this.generateWithHeuristic(input);
    }
  }

  private async generateWithOpenAI(input: { title: string; content: string; targetKeywords?: string[] }) {
    const prompt = `Generate an SEO-optimized meta description for this medical blog post.

Title: "${input.title}"
Content Preview: "${input.content.substring(0, 500)}"
${input.targetKeywords?.length ? `Target Keywords: ${input.targetKeywords.join(', ')}` : ''}

Requirements:
- Exactly 150-160 characters
- Include a call-to-action
- Include the primary keyword naturally
- Medical/healthcare tone

Return JSON: { "metaDescription": "...", "seoScore": 0-100 }`;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.4,
        max_tokens: 300,
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

    EventBus.emit('ai.completed', { jobId: `meta-${Date.now()}`, provider: 'OpenAI', status: 'SUCCESS' });

    return {
      metaDescription: parsed.metaDescription,
      charCount: parsed.metaDescription.length,
      seoScore: parsed.seoScore || 85,
      tokensUsed,
    };
  }

  private generateWithHeuristic(input: { title: string; content: string; targetKeywords?: string[] }) {
    // Extract first meaningful sentence from content
    const sentences = input.content.replace(/[#*_]/g, '').split(/[.!?]/);
    const firstSentence = sentences.find(s => s.trim().length > 30)?.trim() || input.title;

    // Build meta description
    let meta = `${firstSentence}. Learn more at Focus Ultrasound Clinic.`;
    if (meta.length > 160) meta = meta.substring(0, 157) + '...';
    if (meta.length < 120) meta += ' Expert fetal care for expecting parents.';

    // Compute basic SEO score
    let seoScore = 50;
    if (meta.length >= 140 && meta.length <= 160) seoScore += 20;
    if (input.targetKeywords?.some(kw => meta.toLowerCase().includes(kw.toLowerCase()))) seoScore += 20;
    if (meta.includes('Learn') || meta.includes('Discover') || meta.includes('Book')) seoScore += 10;

    return {
      metaDescription: meta,
      charCount: meta.length,
      seoScore: Math.min(seoScore, 100),
      tokensUsed: 0,
    };
  }
}

export const metaDescriptionService = new MetaDescriptionService();
