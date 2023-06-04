import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class AddCommentDto {
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  musicId: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  userId: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  content: string;
}

export class UpdateCommentDto {
  @ApiHideProperty()
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @ApiHideProperty()
  @IsNotEmpty()
  musicId: number;

  @ApiHideProperty()
  @IsOptional()
  userId: number;

  @ApiProperty()
  @IsNotEmpty()
  content: string;
}
