import { Router, Request, Response } from 'express';
import { blogDraftService } from '../../../../modules/ai/services/BlogDraftService';
import { metaDescriptionService } from '../../../../modules/ai/services/MetaDescriptionService';
import { keywordSuggestionService } from '../../../../modules/ai/services/KeywordSuggestionService';
import { leadReplyService } from '../../../../modules/ai/services/LeadReplyService';
import { Logger } from '../../../../core/Logger';

const aiRoutes = Router();

/**
 * POST /api/v1/ai/blog-draft
 * Generate an AI-powered blog article draft
 */
aiRoutes.post('/blog-draft', async (req: Request, res: Response) => {
  try {
    const { topic, keywords, locale } = req.body;
    if (!topic) return res.status(400).json({ error: 'Topic is required.' });

    const result = await blogDraftService.generateDraft({ topic, keywords, locale });
    return res.status(200).json({ status: 'SUCCESS', data: result });
  } catch (err) {
    Logger.error(`[AI Route] /blog-draft failed: ${err}`);
    return res.status(500).json({ error: 'AI blog draft generation failed.' });
  }
});

/**
 * POST /api/v1/ai/meta-description
 * Generate an SEO-optimized meta description
 */
aiRoutes.post('/meta-description', async (req: Request, res: Response) => {
  try {
    const { title, content, targetKeywords } = req.body;
    if (!title || !content) return res.status(400).json({ error: 'Title and content are required.' });

    const result = await metaDescriptionService.generate({ title, content, targetKeywords });
    return res.status(200).json({ status: 'SUCCESS', data: result });
  } catch (err) {
    Logger.error(`[AI Route] /meta-description failed: ${err}`);
    return res.status(500).json({ error: 'Meta description generation failed.' });
  }
});

/**
 * POST /api/v1/ai/keywords
 * Suggest SEO keywords for a topic
 */
aiRoutes.post('/keywords', async (req: Request, res: Response) => {
  try {
    const { topic, existingContent, count } = req.body;
    if (!topic) return res.status(400).json({ error: 'Topic is required.' });

    const result = await keywordSuggestionService.suggest({ topic, existingContent, count });
    return res.status(200).json({ status: 'SUCCESS', data: result });
  } catch (err) {
    Logger.error(`[AI Route] /keywords failed: ${err}`);
    return res.status(500).json({ error: 'Keyword suggestion failed.' });
  }
});

/**
 * POST /api/v1/ai/lead-reply
 * Generate AI-powered reply suggestions for a patient lead
 */
aiRoutes.post('/lead-reply', async (req: Request, res: Response) => {
  try {
    const { leadId, name, message, priorityScore } = req.body;
    if (!leadId || !name || !message) {
      return res.status(400).json({ error: 'leadId, name, and message are required.' });
    }

    const result = await leadReplyService.suggestReply({ leadId, name, message, priorityScore: priorityScore || 0 });
    return res.status(200).json({ status: 'SUCCESS', data: result });
  } catch (err) {
    Logger.error(`[AI Route] /lead-reply failed: ${err}`);
    return res.status(500).json({ error: 'Lead reply suggestion failed.' });
  }
});

/**
 * GET /api/v1/ai/health
 * AI subsystem health check
 */
aiRoutes.get('/health', async (_req: Request, res: Response) => {
  return res.status(200).json({
    status: 'ONLINE',
    services: {
      blogDraft: await blogDraftService.health(),
      metaDescription: await metaDescriptionService.health(),
      keywordSuggestion: await keywordSuggestionService.health(),
      leadReply: await leadReplyService.health(),
    },
    timestamp: new Date().toISOString(),
  });
});

export { aiRoutes };
