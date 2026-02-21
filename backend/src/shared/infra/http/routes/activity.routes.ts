import { Router, Request, Response } from 'express';
import { activityService } from '../middlewares/ActivityService';
import { Logger } from '../../../../core/Logger';

const activityRoutes = Router();

/**
 * GET /api/v1/activity
 * Fetch paginated admin activity logs
 */
activityRoutes.get('/', async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 25;
    const entityType = req.query.entityType as string | undefined;
    const userId = req.query.userId as string | undefined;

    const result = await activityService.getRecentActivity({ page, limit, entityType, userId });
    return res.status(200).json({ status: 'SUCCESS', ...result });
  } catch (err) {
    Logger.error(`[Activity Route] Failed to fetch activity: ${err}`);
    return res.status(500).json({ error: 'Failed to retrieve activity logs.' });
  }
});

/**
 * GET /api/v1/activity/summary
 * Get activity summary statistics
 */
activityRoutes.get('/summary', async (req: Request, res: Response) => {
  try {
    const days = parseInt(req.query.days as string) || 7;
    const summary = await activityService.getActivitySummary(days);
    return res.status(200).json({ status: 'SUCCESS', data: summary });
  } catch (err) {
    Logger.error(`[Activity Route] Failed to get summary: ${err}`);
    return res.status(500).json({ error: 'Failed to generate summary.' });
  }
});

export { activityRoutes };
