import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { HomeService } from '@/home/home.service';
import { ParamIdDto } from '@shared/dtos/common.dto';
import { HomeDto } from '@/home/home.dto';
import { GetUser } from '@/auth/decorator/get-user.decorator';
import { User } from '@/user/entities/user.entity';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/auth/guard/jwt-auth.guard';

@Controller('home')
@ApiTags('Home')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class HomeController {
  constructor(private readonly service: HomeService) {}

  @Get(':id')
  async recommend(@Param() param: ParamIdDto) {
    return this.service.handleRecommendByMusic(param.id);
  }

  @Get()
  async home(@Query() query: HomeDto, @GetUser() user: User) {
    return this.service.getHome({ ...query, user: user });
  }
}
