import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';
import {
  StringToArray,
  ToNumber,
  ToNumbers,
} from '@base/decorators/common.decorator';
import { Transform } from 'class-transformer';

export class ListDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsPositive()
  @ToNumber()
  page?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsPositive()
  @ToNumber()
  limit?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  sortBy?: [string, string][];

  @ApiProperty({ required: false })
  @IsOptional()
  @StringToArray()
  searchBy?: string[];

  @ApiProperty({ required: false })
  @IsOptional()
  search?: string;

  @ApiProperty({ required: false, type: 'text' })
  @IsOptional()
  filter?: { [column: string]: string | string[] };

  @ApiProperty({ required: false })
  @IsOptional()
  select?: string[];

  @ApiProperty({ required: false })
  @IsOptional()
  path?: string;
}

export class ParamIdDto {
  @ApiProperty()
  @Transform(({ value }) => value && +value)
  @IsNotEmpty()
  @IsPositive()
  id: number;
}

export class BulkIdsDto {
  @ApiProperty()
  @ToNumbers()
  @IsNotEmpty()
  @IsPositive({ each: true })
  ids: number[];
}
