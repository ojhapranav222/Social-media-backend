import { Module } from '@nestjs/common';
import { FeedsService } from './feeds.service';
import { FeedsController } from './feeds.controller';
import { FeedsRepository } from './feeds.repository';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [FeedsController],
  providers: [FeedsService, FeedsRepository],
  exports: [FeedsRepository],
})
export class FeedsModule {}