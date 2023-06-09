import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { MusicService } from '@/music/music.service';
import { JwtAuthGuard } from '@/auth/guard/jwt-auth.guard';
import { AddMusicDto, MusicDto, UpdateMusicDto } from '@/music/music.dto';
import { BulkIdsDto, ParamIdDto } from '@shared/dtos/common.dto';
import { Public } from '@/auth/decorator/public.decorator';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('music')
@ApiTags('Musics')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class MusicController {
  constructor(private readonly service: MusicService) {}

  // @Public()
  @Get()
  async listMusic(@Query() query: MusicDto) {
    return this.service.listMusic(query);
  }

  @Get(':id')
  async getMusic(@Param() param: ParamIdDto) {
    return this.service.getMusic(param.id);
  }

  @Post()
  @Public()
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('file'))
  async addMusic(
    @Body() dto: AddMusicDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.service.addMusic({ ...dto, file: file.filename });
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
