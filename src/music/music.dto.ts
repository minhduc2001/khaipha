import { ListDto } from '@shared/dtos/common.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';
import { Trim } from '@base/decorators/common.decorator';

export class MusicDto extends ListDto {}

export class AddMusicDto {
  @ApiProperty()
  @IsString()
  @Trim()
  title: string;

  @ApiProperty()
  @IsString()
  @Trim()
  releaseDate: string;
}

export class UpdateMusicDto {}
