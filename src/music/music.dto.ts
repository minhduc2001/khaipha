import { ListDto } from '@shared/dtos/common.dto';
import { ApiHideProperty, ApiProperty, PickType } from '@nestjs/swagger';
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
  image: string;

  @ApiProperty({
    type: 'string',
    format: 'binary',
    description: 'File to upload',
  })
  @IsOptional()
  audio: string;
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

  @ApiProperty()
  @IsString()
  @IsOptional()
  @Trim()
  authors: string;
  //
  // @ApiHideProperty()
  // @IsOptional()
  // audio: string;
}

export class UpdateMusicDto extends PickType(AddMusicDto, [
  'authors',
  'album',
  'artist',
  'audio',
  'image',
  'releaseDate',
  'duration',
]) {
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  @Trim()
  title: string;

  @ApiHideProperty()
  @IsOptional()
  @IsPositive()
  @ToNumber()
  id: number;
}
