import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { ListDto } from '@shared/dtos/common.dto';
import { ToNumber } from '@base/decorators/common.decorator';
import { User } from '@/user/entities/user.entity';

export class CommentsDto extends ListDto {}
export class AddCommentDto {
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  musicId: number;

  @ApiHideProperty()
  @IsNumber()
  @IsOptional()
  userId: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  content: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  @ToNumber()
  star: number;

  @ApiHideProperty()
  @IsOptional()
  user: User;
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

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  star: number;
}
