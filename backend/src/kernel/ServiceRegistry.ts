import { Logger } from '../core/Logger';

export interface IKernelService {
  name: string;
  init(): Promise<void>;
  start(): Promise<void>;
  stop(): Promise<void>;
  health(): Promise<{ status: 'ONLINE' | 'DEGRADED' | 'OFFLINE', metrics?: any }>;
}

export class ServiceRegistry {
  private services: Map<string, IKernelService> = new Map();

  register(service: IKernelService) {
    if (this.services.has(service.name)) {
      throw new Error(`Service ${service.name} is already registered.`);
    }
    this.services.set(service.name, service);
    Logger.info(`[ServiceRegistry] Registered plugin: ${service.name}`);
  }

  getService(name: string): IKernelService | undefined {
    return this.services.get(name);
  }

  getAllServices(): IKernelService[] {
    return Array.from(this.services.values());
  }

  async startAll() {
    for (const service of this.services.values()) {
      try {
        Logger.info(`[ServiceRegistry] Starting ${service.name}...`);
        await service.init();
        await service.start();
        Logger.info(`[ServiceRegistry] ${service.name} started successfully.`);
      } catch (err) {
        Logger.error(`[ServiceRegistry] Failed to start ${service.name}: ${err}`);
        // Micro-kernel resilience: don't crash the whole kernel if 1 plugin fails unless critical
      }
    }
  }

  async stopAll() {
    for (const service of this.services.values()) {
      await service.stop();
    }
  }
}
