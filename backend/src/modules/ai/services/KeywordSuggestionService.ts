import { Logger } from '../../../core/Logger';
import { prisma } from '../../../shared/infra/database/prismaClient';
import { EventBus } from '../../../events/EventBus';
import { IKernelService } from '../../../kernel/ServiceRegistry';

/**
 * KeywordSuggestionService — AI-powered SEO keyword engine
 * 
 * Suggests high-ranking keywords for medical blog content using
 * OpenAI analysis or a curated local medical keyword knowledge base.
 */
export class KeywordSuggestionService implements IKernelService {
  name = 'KeywordSuggestionService';
  private apiKey: string | undefined;

  // Curated medical SEO keyword database for offline mode
  private readonly MEDICAL_KEYWORD_DB: Record<string, string[]> = {
    ultrasound: ['level 2 ultrasound', '3D ultrasound', '4D ultrasound', 'anomaly scan', 'NT scan', 'dating scan', 'growth scan', 'ultrasound near me', 'pregnancy scan cost'],
    fetal: ['fetal echocardiography', 'fetal anomaly', 'fetal medicine', 'fetal heart scan', 'fetal growth monitoring', 'fetal doppler', 'fetal well-being'],
    pregnancy: ['first trimester', 'second trimester', 'third trimester', 'prenatal care', 'pregnancy diet', 'high risk pregnancy', 'twin pregnancy', 'gestational diabetes'],
    scan: ['anomaly scan cost', 'nuchal translucency scan', 'double marker test', 'TIFFA scan', 'detailed scan', 'color doppler'],
    clinic: ['best ultrasound clinic', 'fetal medicine specialist', 'gynecologist near me', 'prenatal clinic', 'obstetric scan'],
  };

  async init() {
    this.apiKey = process.env.OPENAI_API_KEY;
    Logger.info(`[${this.name}] Initialized. Mode: ${this.apiKey ? 'OpenAI' : 'LocalKnowledgeBase'}`);
  }

  async start() { Logger.info(`[${this.name}] Keyword Suggestion Engine online.`); }
  async stop() { Logger.info(`[${this.name}] Shutting down.`); }
  async health() { return { status: 'ONLINE' as const }; }

  /**
   * Suggest SEO keywords for a given topic or blog content.
   */
  async suggest(input: { topic: string; existingContent?: string; count?: number }): Promise<{
    primary: string[];
    secondary: string[];
    longTail: string[];
    competitiveness: Record<string, 'LOW' | 'MEDIUM' | 'HIGH'>;
    tokensUsed: number;
  }> {
    const count = input.count || 10;

    try {
      if (this.apiKey) {
        return await this.suggestWithOpenAI(input.topic, input.existingContent, count);
      }
      return this.suggestFromLocalDB(input.topic, count);
    } catch (err) {
      Logger.error(`[${this.name}] Suggestion failed, falling back to local DB: ${err}`);
      return this.suggestFromLocalDB(input.topic, count);
    }
  }

  private async suggestWithOpenAI(topic: string, existingContent: string | undefined, count: number) {
    const prompt = `You are an SEO specialist for a fetal ultrasound clinic in India.

Suggest ${count} SEO keywords for this topic: "${topic}"
${existingContent ? `Existing content preview: "${existingContent.substring(0, 300)}"` : ''}

Return JSON:
{
  "primary": ["top 3 most important keywords"],
  "secondary": ["5 supporting keywords"],
  "longTail": ["5 long-tail keyword phrases with 3+ words"],
  "competitiveness": { "keyword": "LOW|MEDIUM|HIGH" }
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
        temperature: 0.5,
        max_tokens: 800,
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

    EventBus.emit('ai.completed', { jobId: `keywords-${Date.now()}`, provider: 'OpenAI', status: 'SUCCESS' });

    return { ...parsed, tokensUsed };
  }

  private suggestFromLocalDB(topic: string, count: number) {
    const topicLower = topic.toLowerCase();
    let allKeywords: string[] = [];

    // Match topic against curated knowledge base
    for (const [category, keywords] of Object.entries(this.MEDICAL_KEYWORD_DB)) {
      if (topicLower.includes(category) || keywords.some(kw => topicLower.includes(kw.split(' ')[0]))) {
        allKeywords.push(...keywords);
      }
    }

    // If no domain match, return generic medical keywords
    if (allKeywords.length === 0) {
      allKeywords = Object.values(this.MEDICAL_KEYWORD_DB).flat();
    }

    // Deduplicate and slice
    allKeywords = [...new Set(allKeywords)].slice(0, count * 2);

    const primary = allKeywords.slice(0, 3);
    const secondary = allKeywords.slice(3, 8);
    const longTail = allKeywords.filter(kw => kw.split(' ').length >= 3).slice(0, 5);

    const competitiveness: Record<string, 'LOW' | 'MEDIUM' | 'HIGH'> = {};
    allKeywords.forEach(kw => {
      competitiveness[kw] = kw.split(' ').length >= 3 ? 'LOW' : kw.includes('near me') ? 'HIGH' : 'MEDIUM';
    });

    Logger.info(`[${this.name}] Generated ${allKeywords.length} keywords from local knowledge base for topic "${topic}".`);

    return { primary, secondary, longTail, competitiveness, tokensUsed: 0 };
  }
}

export const keywordSuggestionService = new KeywordSuggestionService();
