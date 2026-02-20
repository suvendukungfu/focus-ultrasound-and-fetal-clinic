export interface IDashboardStats {
  totalLeads: number;
  newLeads: number;
  totalServices: number;
  totalReviews: number;
  pendingReviews: number;
  totalBlogPosts: number;
}

export interface IAnalyticsRepository {
  getDashboardStats(): Promise<IDashboardStats>;
}
