import { Review } from '@prisma/client';
import { ICreateReviewDTO } from '../../dtos/ICreateReviewDTO';
import { IReviewsRepository } from '../IReviewsRepository';
import { prisma } from '../../../../shared/infra/database/prismaClient';

export class PrismaReviewsRepository implements IReviewsRepository {
  async create(data: ICreateReviewDTO): Promise<Review> {
    return prisma.review.create({
      data: {
        name: data.name,
        rating: data.rating,
        comment: data.comment,
        source: data.source ?? 'manual',
        externalId: data.externalId,
        isApproved: false,
      },
    });
  }

  async listAll(): Promise<Review[]> {
    return prisma.review.findMany({
      where: { deletedAt: null },
      orderBy: { createdAt: 'desc' },
    });
  }

  async listApproved(): Promise<Review[]> {
    return prisma.review.findMany({
      where: { isApproved: true, deletedAt: null },
      orderBy: [{ rating: 'desc' }, { createdAt: 'desc' }],
    });
  }

  async findById(id: string): Promise<Review | null> {
    return prisma.review.findUnique({ where: { id } });
  }

  async findByExternalId(externalId: string): Promise<Review | null> {
    return prisma.review.findFirst({
      where: { externalId },
    });
  }

  async approve(id: string): Promise<Review> {
    return prisma.review.update({
      where: { id },
      data: { isApproved: true },
    });
  }

  async delete(id: string): Promise<void> {
    await prisma.review.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }

  /**
   * Idempotent upsert from Google Places.
   * Skips silently if the externalId already exists.
   */
  async upsertFromGoogle(
    data: ICreateReviewDTO & { externalId: string }
  ): Promise<Review> {
    const existing = await this.findByExternalId(data.externalId);
    if (existing) return existing;

    return prisma.review.create({
      data: {
        name: data.name,
        rating: data.rating,
        comment: data.comment,
        source: 'google',
        externalId: data.externalId,
        isApproved: true, // Google reviews are auto-approved
      },
    });
  }
}
