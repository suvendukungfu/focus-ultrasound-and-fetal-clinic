import { Request, Response } from 'express';
import { GetDashboardStatsUseCase } from './GetDashboardStatsUseCase';
import { PrismaAnalyticsRepository } from '../../repositories/implementations/PrismaAnalyticsRepository';

const prismaAnalyticsRepository = new PrismaAnalyticsRepository();
const getDashboardStatsUseCase = new GetDashboardStatsUseCase(prismaAnalyticsRepository);

export class GetDashboardStatsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const stats = await getDashboardStatsUseCase.execute();
    return response.json(stats);
  }
}
