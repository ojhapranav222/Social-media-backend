import { IsInt } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateReportDto {
  @ApiProperty({ description: 'The ID of the feed to report' })
  @IsInt()
  feed_id: number;
}
