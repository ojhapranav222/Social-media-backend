import { IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateFeedDto {
  @IsString()
  @IsOptional()
  @MaxLength(1000)
  text_content?: string;
}
