import { 
  Controller, 
  Post, 
  Get, 
  Body, 
  Param, 
  UseGuards, 
  Request, 
  ParseIntPipe 
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiParam } from '@nestjs/swagger';

@ApiTags('Comments')
@Controller('feeds/:feedId/comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Post a comment on a feed' })
  @ApiParam({ name: 'feedId', description: 'ID of the feed to comment on', type: Number })
  create(
    @Param('feedId', ParseIntPipe) feedId: number,
    @Body() createCommentDto: CreateCommentDto,
    @Request() req,
  ) {
    return this.commentsService.create(createCommentDto, req.user.id, feedId);
  }

  @Get()
  @ApiOperation({ summary: 'Get all comments for a feed' })
  @ApiParam({ name: 'feedId', description: 'ID of the feed to get comments for', type: Number })
  findAll(@Param('feedId', ParseIntPipe) feedId: number) {
    return this.commentsService.findAllForFeed(feedId);
  }
}
