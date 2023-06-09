import { ListDto } from '@shared/dtos/common.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsPositive, IsString } from 'class-validator';
import { ToNumber, Trim } from '@base/decorators/common.decorator';

export class MusicDto extends ListDto {}

export class UploadMusicDto {
  @ApiProperty({
    type: 'string',
    format: 'binary',
    description: 'File to upload',
  })
  @IsOptional()
  file: string;
}

export class AddMusicDto extends UploadMusicDto {
  @ApiProperty()
  @IsString()
  @Trim()
  title: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  @ToNumber()
  releaseDate: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  @Trim()
  artist: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsPositive()
  @ToNumber()
  duration: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  @Trim()
  album: string;
}

export class UpdateMusicDto {}
