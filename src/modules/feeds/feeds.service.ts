import { Injectable, Inject, BadRequestException } from '@nestjs/common';
import { FeedsRepository } from './feeds.repository';
import { CreateFeedDto } from './dto/create-feed.dto';
import { CloudinaryService } from '../../core/cloudinary/cloudinary.service';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { Feed } from '@prisma/client';

@Injectable()
export class FeedsService {
  constructor(
    private readonly repository: FeedsRepository,
    private readonly cloudinaryService: CloudinaryService,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
  ) {}

  async create( 
    createFeedDto: CreateFeedDto,
    files: Express.Multer.File[],
    authorId: number,
  ) {
    if (!createFeedDto.text_content && (!files || files.length === 0)) {
      throw new BadRequestException(
        'A feed must have either text content or at least one image.',
      );
    }

    if (files && files.length > 4) {
      throw new BadRequestException('You can upload a maximum of 4 images.');
    }

    const imageUrls = files && files.length > 0 ? await Promise.all(
      files.map(async (file) => {
        const result = await this.cloudinaryService.uploadImage(file);
        return result.secure_url;
      }),
    ) : [];

    const feed = await this.repository.create(
      {
        text_content: createFeedDto.text_content,
        author: {
          connect: { id: authorId },
        },
      },
      imageUrls,
    );

    // Invalidate cache after creating a new feed
    await this.cacheManager.del('feeds_page_1');

    return feed;
  }

  async findAll(page: number = 1, limit: number = 10): Promise<Feed[]> {
    const cacheKey = `feeds_page_${page}`;
    const cachedFeeds = await this.cacheManager.get<Feed[]>(cacheKey);

    if (cachedFeeds) {
      return cachedFeeds;
    }

    const feeds = await this.repository.findMany({
      skip: (page - 1) * limit,
      take: limit,
    });

    // Cache the result for 1 minute
    await this.cacheManager.set(cacheKey, feeds, 60);

    return feeds;
  }
}
