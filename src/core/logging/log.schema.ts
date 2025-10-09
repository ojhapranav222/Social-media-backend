import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Log extends Document {
  @Prop({ required: true })
  timestamp: Date;

  @Prop({ required: true })
  level: string;

  @Prop({ required: true })
  message: string;

  @Prop({ required: true })
  context: string;

  @Prop()
  stack?: string;
}

export const LogSchema = SchemaFactory.createForClass(Log);