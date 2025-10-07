import { 
  Controller, 
  Post, 
  Get, 
  Body, 
  UseInterceptors, 
  UploadedFiles, 
  UseGuards, 
  Request, 
  Query, 
  ParseIntPipe, 
  DefaultValuePipe 
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { FeedsService } from './feeds.service';
import { CreateFeedDto } from './dto/create-feed.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiTags, ApiConsumes, ApiBody, ApiOperation, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';

@ApiTags('Feeds')
@Controller('feeds')
export class FeedsController {
  constructor(private readonly feedsService: FeedsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiBearerAuth()
  @UseInterceptors(FilesInterceptor('images', 4)) // 'images' is the field name, 4 is the max number of files
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Create a new feed post' })
  @ApiBody({
    description: 'Feed data and images. Provide either text_content, images, or both.',
    schema: {
      type: 'object',
      properties: {
        text_content: { type: 'string', nullable: true },
        images: {
          type: 'array',
          items: {
            type: 'string',
            format: 'binary',
          },
          nullable: true,
        },
      },
    },
  })
  create(
    @Body() createFeedDto: CreateFeedDto,
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Request() req,
  ) {
    return this.feedsService.create(createFeedDto, files, req.user.id);
  }

  @Get()
  @ApiOperation({ summary: 'Get all feed posts' })
  @ApiQuery({ name: 'page', required: false, description: 'Page number for pagination', type: Number })
  @ApiQuery({ name: 'limit', required: false, description: 'Number of items per page', type: Number })
  findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
  ) {
    return this.feedsService.findAll(page, limit);
  }
}
