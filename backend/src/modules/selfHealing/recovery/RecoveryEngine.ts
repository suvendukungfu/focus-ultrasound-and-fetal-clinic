import { EventBus } from '../../../events/EventBus';
import { prisma } from '../../../shared/infra/database/prismaClient';
import { Logger } from '../../../core/Logger';
import { worker, queueLeadProcessing } from '../../../core/queue/LeadQueue';
import { redisClient } from '../../../core/cache/RedisClient';

export class RecoveryEngine {
  
  async scaleWorkers() {
    const startTime = Date.now();
    Logger.info(`[Recovery] Executing action: scaleWorkers`);
    
    if (worker) {
      worker.concurrency = 50; // Massively increase local concurrency 
    }
    
    await prisma.recoveryLog.create({
      data: {
        actionTaken: 'scaleWorkers',
        success: true,
        targetSystem: 'LeadQueue',
        executionMs: Date.now() - startTime
      }
    });

    EventBus.emit('system.recovered', { target: 'LeadQueue' });
  }

  async flushStaleCache() {
    Logger.info(`[Recovery] Executing action: flushRedis`);
    // Clear potentially corrupted lock keys
    if (process.env.NODE_ENV !== 'development' || process.env.REDIS_URL) {
      await redisClient.flushall();
    }
    
    await prisma.recoveryLog.create({
      data: {
        actionTaken: 'flushRedis',
        success: true,
        targetSystem: 'RedisCache'
      }
    });

    EventBus.emit('system.recovered', { target: 'RedisCache' });
  }

  async pauseNonCriticalQueues() {
    Logger.warn(`[Recovery] Executing action: pauseNonCriticalQueues. Halting LeadQueue!`);
    if (queueLeadProcessing) {
      await queueLeadProcessing.pause();
    }

    await prisma.recoveryLog.create({
      data: {
        actionTaken: 'pauseQueue',
        success: true,
        targetSystem: 'LeadQueue'
      }
    });
  }
}

export const recoveryEngine = new RecoveryEngine();
