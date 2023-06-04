import { ListDto } from '@shared/dtos/common.dto';
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { User } from '@/user/entities/user.entity';

export class HistoriesDto extends ListDto {}

export class AddHistoriesDto {
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  musicId: number;

  @ApiHideProperty()
  @IsOptional()
  user: User;
}

export class UpdateHistoriesDto {
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  musicId: number;

  @ApiHideProperty()
  @IsNumber()
  @IsOptional()
  userId: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  position: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  duration: number;
}
