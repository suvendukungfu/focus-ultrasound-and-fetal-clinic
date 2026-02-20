import { Request, Response } from 'express';
import { prisma } from '../../../../shared/infra/database/prismaClient';
import { Kernel } from '../../../../kernel/Kernel';

export class PlatformController {
  
  async getTopology(req: Request, res: Response) {
    try {
      const activeServices = Kernel.registry.getAllServices().map(s => s.name);
      
      const serviceHealth = await prisma.serviceStatus.findMany({
        orderBy: { updatedAt: 'desc' }
      });
      
      const regionMetrics = await prisma.regionMetric.findMany({
        orderBy: { recordedAt: 'desc' },
        take: 5
      });
      
      const aiThroughput = await prisma.aIProviderStats.findMany({
        orderBy: { createdAt: 'desc' },
        take: 10
      });

      return res.status(200).json({
        platformState: 'DISTRIBUTED_ACTIVE',
        region: Kernel.region,
        workerCount: require('os').cpus().length,
        activeServices,
        serviceHealth,
        regionMetrics,
        aiThroughput
      });
    } catch (err) {
      if (err instanceof Error) {
        return res.status(500).json({ error: err.message });
      }
      return res.status(500).json({ error: 'Failed to fetch platform topology' });
    }
  }
}
