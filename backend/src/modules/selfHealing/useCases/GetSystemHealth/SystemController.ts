import { Request, Response } from 'express';
import { prisma } from '../../../../shared/infra/database/prismaClient';

export class SystemController {
  
  // GET /api/v1/system/health
  async getHealth(req: Request, res: Response) {
    try {
      res.status(200).json({ status: 'OK', uptime: process.uptime() });
    } catch (err) {
      res.status(500).json({ status: 'DEGRADED' });
    }
  }

  // GET /api/v1/system/metrics
  async getMetrics(req: Request, res: Response) {
    const activeAlerts = await prisma.systemAlert.findMany({
      where: { acknowledged: false },
      orderBy: { createdAt: 'desc' }
    });

    const recentRecovery = await prisma.recoveryLog.findMany({
      orderBy: { createdAt: 'desc' },
      take: 5
    });

    const latestInsights = await prisma.predictiveInsight.findMany({
      orderBy: { createdAt: 'desc' },
      take: 3
    });

    res.json({
      systemRiskScore: activeAlerts.length > 0 ? 'CRITICAL' : 'STABLE',
      activeAlerts,
      recoveryActions: recentRecovery,
      insights: latestInsights,
      lastIncidentAt: recentRecovery[0]?.createdAt || null
    });
  }
}
