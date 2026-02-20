import { IAnalyticsRepository } from '../../repositories/IAnalyticsRepository';

export class GetDashboardStatsUseCase {
  constructor(private analyticsRepository: IAnalyticsRepository) {}

  async execute() {
    const stats = await this.analyticsRepository.getDashboardStats();
    return stats;
  }
}
