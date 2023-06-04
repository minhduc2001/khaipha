import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { HistoriesService } from '@/histories/histories.service';
import {
  AddHistoriesDto,
  HistoriesDto,
  UpdateHistoriesDto,
} from '@/histories/histories.dto';
import { GetUser } from '@/auth/decorator/get-user.decorator';
import { ParamIdDto } from '@shared/dtos/common.dto';
import { User } from '@/user/entities/user.entity';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/auth/guard/jwt-auth.guard';

@Controller('histories')
@ApiTags('Histories')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class HistoriesController {
  constructor(private readonly service: HistoriesService) {}

  @Get()
  async listHistories(@Query() query: HistoriesDto) {
    return this.service.listHistory(query);
  }

  @Post()
  async add(@Body() dto: AddHistoriesDto, @GetUser() user: User) {
    return this.service.addHistories({ ...dto, user });
  }

  @Put(':id')
  async update(
    @Param() param: ParamIdDto,
    @Body() dto: UpdateHistoriesDto,
    @GetUser() user: User,
  ) {
    return this.service.updateHistories({
      ...param,
      ...dto,
      userId: user.id,
    });
  }
}
