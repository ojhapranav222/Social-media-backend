import { Injectable } from '@nestjs/common';
import { CommentsRepository } from './comments.repository';
import { CreateCommentDto } from './dto/create-comment.dto';

@Injectable()
export class CommentsService {
  constructor(private readonly repository: CommentsRepository) {}

  async create(
    createCommentDto: CreateCommentDto,
    authorId: number,
    feedId: number,
  ) {
    return this.repository.create({
      text_content: createCommentDto.text_content,
      author: {
        connect: { id: authorId },
      },
      feed: {
        connect: { id: feedId },
      },
    });
  }

  async findAllForFeed(feedId: number) {
    return this.repository.findManyByFeedId(feedId);
  }
}
