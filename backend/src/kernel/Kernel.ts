import { Logger } from '../core/Logger';
import { ServiceRegistry } from './ServiceRegistry';
import { HealthSupervisor } from './HealthSupervisor';
import { EventGateway } from './EventGateway';

class SystemKernel {
  public registry: ServiceRegistry;
  public supervisor: HealthSupervisor;
  public eventGateway: EventGateway;
  
  public region: string;

  constructor() {
    this.region = process.env.REGION || 'GLOBAL-1';
    this.registry = new ServiceRegistry();
    this.supervisor = new HealthSupervisor(this.registry, this.region);
    this.eventGateway = new EventGateway(this.region);
  }

  async boot() {
    Logger.info(`[Kernel-${this.region}] Booting Micro-Kernel Architecture...`);
    
    // Boot gateway first to capture plugin loading events
    await this.eventGateway.start();

    // Start all loaded plugins in parallel safely
    await this.registry.startAll();
    
    // Start health tracking loop
    this.supervisor.startMonitoring();
    
    Logger.info(`[Kernel-${this.region}] Boot Sequence Complete. System ONLINE.`);
  }

  async shutdown() {
    Logger.warn(`[Kernel-${this.region}] Initiating Graceful Shutdown Protocol...`);
    this.supervisor.stopMonitoring();
    await this.registry.stopAll();
    await this.eventGateway.stop();
    Logger.info(`[Kernel-${this.region}] Shutdown Complete.`);
  }
}

export const Kernel = new SystemKernel();
