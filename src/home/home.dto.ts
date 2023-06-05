import { ListDto } from '@shared/dtos/common.dto';
import { ApiHideProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { User } from '@/user/entities/user.entity';

export class HomeDto extends ListDto {
  @ApiHideProperty()
  @IsOptional()
  user: User;
}
