import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../core/prisma/prisma.service';
import { Prisma, Comment } from '@prisma/client';

@Injectable()
export class CommentsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Prisma.CommentCreateInput): Promise<Comment> {
    return this.prisma.comment.create({ data });
  }

  async findManyByFeedId(feedId: number): Promise<Comment[]> {
    return this.prisma.comment.findMany({
      where: { feed_id: feedId },
      include: {
        author: {
          select: {
            id: true,
            username: true,
            first_name: true,
            last_name: true,
          },
        },
      },
      orderBy: { created_at: 'asc' },
    });
  }
}
