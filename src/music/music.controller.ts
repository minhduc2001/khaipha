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
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { MusicService } from '@/music/music.service';
import { JwtAuthGuard } from '@/auth/guard/jwt-auth.guard';
import { AddMusicDto, MusicDto, UpdateMusicDto } from '@/music/music.dto';
import { BulkIdsDto, ParamIdDto } from '@shared/dtos/common.dto';
import { Public } from '@/auth/decorator/public.decorator';
import {
  FileFieldsInterceptor,
  FileInterceptor,
  FilesInterceptor,
} from '@nestjs/platform-express';

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
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'audio', maxCount: 1 },
      { name: 'image', maxCount: 1 },
    ]),
  )
  async addMusic(
    @Body() dto: AddMusicDto,
    @UploadedFiles()
    files: { image?: Express.Multer.File; audio?: Express.Multer.File },
  ) {
    return this.service.addMusic({
      ...dto,
      audio: files.audio[0].filename,
      image: files.image[0].filename,
    });
  }

  @Put(':id')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'audio', maxCount: 1 },
      { name: 'image', maxCount: 1 },
    ]),
  )
  async updateMusic(
    @Param() param: ParamIdDto,
    @Body() dto: UpdateMusicDto,
    @UploadedFiles()
    files: { image?: Express.Multer.File; audio?: Express.Multer.File },
  ) {
    delete dto.authors;
    return this.service.updateMusic({
      ...param,
      ...dto,
      audio: files?.audio?.[0]?.filename,
      image: files?.image?.[0]?.filename,
    });
  }

  @Delete()
  async bulkDelete(@Body() dto: BulkIdsDto) {
    return this.service.bulkDelete(dto.ids);
  }
}
