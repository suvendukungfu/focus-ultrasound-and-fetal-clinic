import { IAnalyticsRepository, IDashboardStats } from '../IAnalyticsRepository';
import { prisma } from '../../../../shared/infra/database/prismaClient';

export class PrismaAnalyticsRepository implements IAnalyticsRepository {
  async getDashboardStats(): Promise<IDashboardStats> {
    const totalLeads = await prisma.lead.count();
    const newLeads = await prisma.lead.count({
      where: { status: 'NEW' as any }, // 'NEW' enum
    });
    const totalServices = await prisma.service.count();
    const totalReviews = await prisma.review.count();
    const pendingReviews = await prisma.review.count({
      where: { isApproved: false },
    });
    const totalBlogPosts = await prisma.blogPost.count();

    return {
      totalLeads,
      newLeads,
      totalServices,
      totalReviews,
      pendingReviews,
      totalBlogPosts,
    };
  }
}
