import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Log } from './log.schema';

@Injectable()
export class LoggingService {
  constructor(@InjectModel(Log.name) private readonly logModel: Model<Log>) {}

  async logError(error: Error, context: string) {
    const logEntry = new this.logModel({
      timestamp: new Date(),
      level: 'error',
      message: error.message,
      context,
      stack: error.stack,
    });
    return logEntry.save();
  }
}
