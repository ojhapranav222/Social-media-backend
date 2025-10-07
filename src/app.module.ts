import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './core/prisma/prisma.module';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { FeedsModule } from './modules/feeds/feeds.module';
import { CommentsModule } from './modules/comments/comments.module';
import { ReportsModule } from './modules/reports/reports.module';
import { CloudinaryModule } from './core/cloudinary/cloudinary.module';
import { CacheModule } from '@nestjs/cache-manager';
import { redisStore } from 'cache-manager-redis-store';
import { MongooseModule } from '@nestjs/mongoose';
import { LoggingModule } from './core/logging/logging.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    MongooseModule.forRoot(process.env.MONGO_URL!),
    CacheModule.register({
      isGlobal: true,
      store: redisStore,
      url: process.env.REDIS_URL!,
    }),
    PrismaModule,
    CloudinaryModule,
    UsersModule,
    AuthModule,
    FeedsModule,
    CommentsModule,
    ReportsModule,
    LoggingModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}