import { redisClient } from '../../../../core/cache/RedisClient';
import { Logger } from '../../../../core/Logger';

const TESTIMONIALS_CACHE_KEY = 'testimonials:active';

export class GetTestimonialsUseCase {
  async execute() {
    try {
      const cached = await redisClient.get(TESTIMONIALS_CACHE_KEY);
      
      if (cached) {
        return JSON.parse(cached);
      }

      Logger.warn('[GetTestimonialsUseCase] Cache miss for testimonials. Returning empty array.');
      return [];
    } catch (error) {
      Logger.error(`[GetTestimonialsUseCase] Error fetching testimonials: ${error}`);
      return [];
    }
  }
}
