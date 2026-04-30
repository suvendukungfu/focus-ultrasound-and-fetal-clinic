import 'dotenv/config';
import { app } from './shared/infra/http/app';
import { Logger } from './core/Logger';
import { prisma } from './shared/infra/database/prismaClient';
import { selfHealingService } from './modules/selfHealing/services/SelfHealingService';

import cluster from 'cluster';
import os from 'os';

const PORT = process.env.PORT || 4000;
const numCPUs = os.cpus().length;

async function bootstrap() {
  try {
    await prisma.$connect();
    Logger.info(`✅ Database connected (Worker ${process.pid})`);
  } catch (error) {
    Logger.error(`❌ Failed to connect to database (Worker ${process.pid})`);
    if (error instanceof Error) {
      Logger.error(error.message);
    }
    // In development, we might want to start anyway to debug API routes
    if (process.env.NODE_ENV !== 'development') {
      await prisma.$disconnect();
      process.exit(1);
    }
  }

  try {
    app.listen(PORT, () => {
      Logger.info(`🚀 Server worker ${process.pid} running on port ${PORT}`);
    });
  } catch (error) {
    Logger.error(`❌ Failed to start server worker ${process.pid}`);
    process.exit(1);
  }
}

// Enterprise Scale: Unlimited concurrent users using Cluster module
if (cluster.isPrimary) {
  Logger.info(`👑 Primary cluster setting up ${numCPUs} workers...`);

  // Boot the new Distributed Micro-Kernel
  import('./kernel/Kernel').then(({ Kernel }) => {
    
    // Wrap existing SelfHealing in a Micro-Service Plugin Wrapper
    Kernel.registry.register({
      name: 'SelfHealingService',
      init: async () => {},
      start: async () => { selfHealingService.startAllMonitors(); },
      stop: async () => {},
      health: async () => ({ status: 'ONLINE' as const })
    });

    // Register Distributed AI Orchestrator
    import('./modules/ai/orchestrator/AIOrchestrator').then(({ aiOrchestrator }) => {
      Kernel.registry.register(aiOrchestrator);
      
      // Register AI Lead Scoring Service
      import('./modules/ai/services/LeadScoringService').then(({ leadScoringService }) => {
        Kernel.registry.register(leadScoringService);

        // Register AI Blog Draft Generator
        import('./modules/ai/services/BlogDraftService').then(({ blogDraftService }) => {
          Kernel.registry.register(blogDraftService);

          // Register AI Meta Description Writer
          import('./modules/ai/services/MetaDescriptionService').then(({ metaDescriptionService }) => {
            Kernel.registry.register(metaDescriptionService);

            // Register AI Keyword Suggestion Engine
            import('./modules/ai/services/KeywordSuggestionService').then(({ keywordSuggestionService }) => {
              Kernel.registry.register(keywordSuggestionService);

              // Register AI Lead Reply Engine
              import('./modules/ai/services/LeadReplyService').then(({ leadReplyService }) => {
                Kernel.registry.register(leadReplyService);

                // Register Reviews Cron Service (BullMQ scheduler + worker)
                import('./modules/reviews/services/ReviewsCronService').then(({ reviewsCronService }) => {
                  Kernel.registry.register(reviewsCronService);

                  // Register Appointment Automation Service (Confirmations + Reminders)
                  import('./modules/appointments/services/AppointmentAutomationService').then(({ appointmentAutomationService }) => {
                    Kernel.registry.register(appointmentAutomationService);

                    Kernel.boot().then(() => {
                      Logger.info(`[Cluster] Kernel Online. Forking Express Node Workers...`);
                      for (let i = 0; i < numCPUs; i++) {
                        cluster.fork();
                      }
                    }).catch(err => {
                      Logger.error(`[Cluster] Critical Kernel failure natively caught: ${err}`);
                      process.exit(1);
                    });
                  });
                });
              });
            });
          });
        });
      });
    });
  });

  cluster.on('online', (worker) => {
    Logger.info(`👷 Worker ${worker.process.pid} is online`);
  });

  cluster.on('exit', (worker, code, signal) => {
    Logger.warn(`⚠️ Worker ${worker.process.pid} died with code: ${code}, and signal: ${signal}`);
    Logger.info('🔄 Restarting worker...');
    cluster.fork();
  });
} else {
  bootstrap();
}
