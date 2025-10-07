import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../core/prisma/prisma.service';
import { Prisma, Feed } from '@prisma/client';

@Injectable()
export class FeedsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    data: Prisma.FeedCreateInput,
    imageUrls: string[],
  ): Promise<Feed> {
    return this.prisma.feed.create({
      data: {
        ...data,
        images: {
          create: imageUrls.map((url) => ({ image_url: url })),
        },
      },
    });
  }

  async update(id: number, data: Prisma.FeedUpdateInput): Promise<Feed> {
    return this.prisma.feed.update({ where: { id }, data });
  }

  async findMany({
    skip,
    take,
  }: { 
    skip: number;
    take: number;
  }): Promise<Feed[]> {
    return this.prisma.feed.findMany({
      where: { is_hidden: false },
      include: {
        author: {
          select: {
            id: true,
            username: true,
            first_name: true,
            last_name: true,
          },
        },
        images: true,
        _count: {
          select: { comments: true },
        },
      },
      orderBy: { created_at: 'desc' },
      skip,
      take,
    });
  }
}
