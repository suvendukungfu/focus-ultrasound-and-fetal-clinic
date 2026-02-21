import { Logger } from '../../../core/Logger';
import { prisma } from '../../../shared/infra/database/prismaClient';
import { EventBus } from '../../../events/EventBus';
import { IKernelService } from '../../../kernel/ServiceRegistry';

/**
 * BlogDraftService — AI-powered blog content generator
 * 
 * Uses OpenAI GPT-4 to generate SEO-optimized medical blog drafts
 * for Focus Ultrasound and Fetal Clinic. Falls back to template-based
 * generation if API key is unavailable.
 */
export class BlogDraftService implements IKernelService {
  name = 'BlogDraftService';
  private apiKey: string | undefined;

  async init() {
    this.apiKey = process.env.OPENAI_API_KEY;
    Logger.info(`[${this.name}] Initialized. OpenAI integration: ${this.apiKey ? 'ENABLED' : 'TEMPLATE_MODE'}`);
  }

  async start() {
    Logger.info(`[${this.name}] Blog Draft Generator is online.`);
  }

  async stop() {
    Logger.info(`[${this.name}] Shutting down Blog Draft Generator.`);
  }

  async health() {
    return { status: 'ONLINE' as const };
  }

  /**
   * Generate a full blog article draft from a topic and optional keywords.
   */
  async generateDraft(input: { topic: string; keywords?: string[]; locale?: string }): Promise<{
    title: string;
    slug: string;
    content: string;
    metaDescription: string;
    suggestedTags: string[];
    tokensUsed: number;
  }> {
    const startTime = Date.now();
    const locale = input.locale || 'en';

    try {
      if (this.apiKey) {
        return await this.generateWithOpenAI(input.topic, input.keywords || [], locale);
      }
      return this.generateWithTemplate(input.topic, input.keywords || [], locale);
    } finally {
      const elapsed = Date.now() - startTime;
      EventBus.emit('ai.completed', {
        jobId: `blog-draft-${Date.now()}`,
        provider: this.apiKey ? 'OpenAI' : 'TemplateEngine',
        status: 'SUCCESS',
        latencyMs: elapsed,
      });
    }
  }

  private async generateWithOpenAI(topic: string, keywords: string[], locale: string) {
    const systemPrompt = `You are a senior medical content writer for Focus Ultrasound and Fetal Clinic. 
Write SEO-optimized, medically accurate blog posts. 
Target audience: expectant mothers and families seeking fetal imaging services in India.
Language: ${locale === 'hi' ? 'Hindi (Devanagari script)' : 'English'}.
Include practical advice and reassurance. Never give direct medical diagnoses.`;

    const userPrompt = `Write a comprehensive blog article about: "${topic}"
${keywords.length > 0 ? `Target SEO keywords: ${keywords.join(', ')}` : ''}

Return the response in this exact JSON format:
{
  "title": "SEO-optimized title",
  "content": "Full markdown article (minimum 800 words with ## headings)",
  "metaDescription": "155-character meta description",
  "suggestedTags": ["tag1", "tag2", "tag3"]
}`;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt },
        ],
        temperature: 0.7,
        max_tokens: 4000,
        response_format: { type: 'json_object' },
      }),
    });

    const data = await response.json();
    const tokensUsed = data.usage?.total_tokens || 0;
    const parsed = JSON.parse(data.choices[0].message.content);

    // Track cost
    await prisma.aIProviderStats.create({
      data: {
        providerName: 'OpenAI',
        modelUsed: 'gpt-4o',
        tokensUsed,
        costEstimate: (tokensUsed / 1000) * 0.01,
        successful: true,
        region: process.env.REGION || 'GLOBAL-1',
      },
    });

    const slug = parsed.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

    return {
      title: parsed.title,
      slug,
      content: parsed.content,
      metaDescription: parsed.metaDescription,
      suggestedTags: parsed.suggestedTags,
      tokensUsed,
    };
  }

  private generateWithTemplate(topic: string, keywords: string[], locale: string): {
    title: string; slug: string; content: string; metaDescription: string; suggestedTags: string[]; tokensUsed: number;
  } {
    const title = `Understanding ${topic} — A Complete Guide for Expecting Parents`;
    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

    const content = `## ${title}

As expectant parents, understanding ${topic.toLowerCase()} is crucial for ensuring the health and well-being of your baby. At Focus Ultrasound and Fetal Clinic, we specialize in providing comprehensive fetal imaging and consultation services.

## What is ${topic}?

${topic} is an important aspect of prenatal care that every expecting parent should be aware of. Our team of experienced fetal medicine specialists uses the latest technology to provide accurate assessments.

## Why is it Important?

Early detection and monitoring through advanced imaging techniques like Level II ultrasounds and fetal echocardiography can help identify potential concerns early, allowing for timely intervention and peace of mind.

${keywords.length > 0 ? `## Key Areas We Cover\n\n${keywords.map(k => `- **${k}**: Comprehensive assessment and expert analysis`).join('\n')}` : ''}

## Book Your Appointment

Contact Focus Ultrasound and Fetal Clinic today to schedule your consultation. Our friendly staff is here to guide you through every step of your pregnancy journey.

---
*This article is for informational purposes only and does not constitute medical advice. Please consult your healthcare provider for personalized guidance.*`;

    return {
      title,
      slug,
      content,
      metaDescription: `Learn about ${topic.toLowerCase()} at Focus Ultrasound and Fetal Clinic. Expert fetal imaging and prenatal care for expecting parents.`,
      suggestedTags: [topic.toLowerCase(), 'fetal care', 'ultrasound', 'prenatal', ...keywords.slice(0, 3)],
      tokensUsed: 0,
    };
  }
}

export const blogDraftService = new BlogDraftService();
