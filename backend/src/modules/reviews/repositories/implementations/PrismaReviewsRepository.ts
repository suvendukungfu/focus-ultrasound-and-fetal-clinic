import { Review } from '@prisma/client';
import { ICreateReviewDTO } from '../../dtos/ICreateReviewDTO';
import { IReviewsRepository } from '../IReviewsRepository';
import { prisma } from '../../../../shared/infra/database/prismaClient';

export class PrismaReviewsRepository implements IReviewsRepository {
  async create(data: ICreateReviewDTO): Promise<Review> {
    const review = await prisma.review.create({
      data: {
        author: data.author,
        rating: data.rating,
        content: data.content,
        isApproved: false, // Default to pending approval
      },
    });
    return review;
  }

  async listAll(): Promise<Review[]> {
    const reviews = await prisma.review.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return reviews;
  }

  async findById(id: string): Promise<Review | null> {
    const review = await prisma.review.findUnique({
      where: { id },
    });
    return review;
  }

  async approve(id: string): Promise<Review> {
    const review = await prisma.review.update({
      where: { id },
      data: { isApproved: true },
    });
    return review;
  }

  async delete(id: string): Promise<void> {
    await prisma.review.delete({
      where: { id },
    });
  }
}
