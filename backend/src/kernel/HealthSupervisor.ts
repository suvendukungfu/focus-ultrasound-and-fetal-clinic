import { ServiceRegistry } from './ServiceRegistry';
import { prisma } from '../shared/infra/database/prismaClient';
import { Logger } from '../core/Logger';
import { selfHealingService } from '../modules/selfHealing/services/SelfHealingService';

export class HealthSupervisor {
  private registry: ServiceRegistry;
  private region: string;
  private intervalId?: NodeJS.Timeout;

  constructor(registry: ServiceRegistry, region: string) {
    this.registry = registry;
    this.region = region;
  }

  startMonitoring() {
    this.intervalId = setInterval(async () => {
      const services = this.registry.getAllServices();
      
      for (const service of services) {
        try {
          const health = await service.health();
          
          await prisma.serviceStatus.upsert({
            where: { serviceName: service.name },
            update: {
              status: health.status,
              uptime: process.uptime(),
              region: this.region
            },
            create: {
              serviceName: service.name,
              status: health.status,
              uptime: process.uptime(),
              region: this.region
            }
          });

          if (health.status === 'OFFLINE') {
            Logger.error(`[HealthSupervisor] Service ${service.name} went OFFLINE.`);
            // Inform self-healing module of a component failure
          }

        } catch (err) {
          Logger.error(`[HealthSupervisor] Failed to health check ${service.name}`);
        }
      }
    }, 30000); // Verify every 30s
  }

  stopMonitoring() {
    if (this.intervalId) clearInterval(this.intervalId);
  }
}
