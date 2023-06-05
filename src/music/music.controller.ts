import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { MusicService } from '@/music/music.service';
import { JwtAuthGuard } from '@/auth/guard/jwt-auth.guard';
import { AddMusicDto, MusicDto, UpdateMusicDto } from '@/music/music.dto';
import { BulkIdsDto, ParamIdDto } from '@shared/dtos/common.dto';
import { Public } from '@/auth/decorator/public.decorator';

@Controller('music')
@ApiTags('Musics')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class MusicController {
  constructor(private readonly service: MusicService) {}

  @Public()
  @Get()
  async listMusic(@Query() query: MusicDto) {
    return this.service.listMusic(query);
  }

  @Post()
  async addMusic(@Body() dto: AddMusicDto) {
    return;
  }

  @Put(':id')
  async updateMusic(@Param() param: ParamIdDto, @Body() dto: UpdateMusicDto) {
    return;
  }

  @Delete()
  async bulkDelete(@Body() dto: BulkIdsDto) {
    return this.service.bulkDelete(dto.ids);
  }
}
