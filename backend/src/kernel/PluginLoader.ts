import { ServiceRegistry, IKernelService } from './ServiceRegistry';
import { Logger } from '../core/Logger';

// Example utility to dynamically load services
export class PluginLoader {
  static loadStandardPlugins(registry: ServiceRegistry, plugins: IKernelService[]) {
    Logger.info(`[PluginLoader] Loading ${plugins.length} standard plugins into Kernel...`);
    for (const plugin of plugins) {
      registry.register(plugin);
    }
  }
}
