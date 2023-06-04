import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { ListDto } from '@/shared/dtos/common.dto';

export class UploadImageAuthor {
  @ApiProperty({
    required: false,
    type: 'string',
    format: 'binary',
    description: 'File to upload',
  })
  @IsOptional()
  image: string;
}

export class CreateAuthorDto extends UploadImageAuthor {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Transform(({ value }) => value && value.trim())
  name: string;

  @ApiProperty({
    example: new Date(),
  })
  @IsNotEmpty()
  birthday: Date;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Transform(({ value }) => value && value.trim())
  description: string;
}

export class ListAuthorsDto extends ListDto {}

export class UpdateAuthorDto extends UploadImageAuthor {
  @ApiHideProperty()
  @IsOptional()
  @IsNumber()
  id: number;

  @ApiProperty({
    required: false,
  })
  @IsOptional()
  @Transform(({ value }) => value && value.trim())
  name: string;

  @ApiProperty({
    required: false,
    example: new Date(),
  })
  @IsOptional()
  birthday: Date;

  @ApiProperty({
    required: false,
  })
  @IsOptional()
  @Transform(({ value }) => value && value.trim())
  description: string;
}
