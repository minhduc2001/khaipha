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
import { BulkIdsDto, ParamIdDto } from '@shared/dtos/common.dto';
import { ApiBearerAuth, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/auth/guard/jwt-auth.guard';
import { AuthorsService } from './authors.service';
import { CreateAuthorDto, ListAuthorsDto, UpdateAuthorDto } from './author.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('authors')
@ApiTags('Authors')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class AuthorsController {
  constructor(private readonly service: AuthorsService) {}

  @Get()
  async getAllAuthors(@Query() query: ListAuthorsDto) {
    return this.service.getAllAuthors(query);
  }

  @Get(':id')
  async getAuthorById(@Param() param: ParamIdDto) {
    return this.service.getAuthorById(param.id);
  }

  @Post()
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('image'))
  async add(
    @Body() dto: CreateAuthorDto,
    @UploadedFile() image: Express.Multer.File,
  ) {
    return this.service.addAuthors({ ...dto, image: image.filename });
  }

  @Put(':id')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('image'))
  async update(
    @Param() param: ParamIdDto,
    @Body() dto: UpdateAuthorDto,
    @UploadedFile() image: Express.Multer.File,
  ) {
    return this.service.updateAuthors({
      ...param,
      ...dto,
      ...image,
    });
  }

  @Delete()
  async delete(@Body() dto: BulkIdsDto) {
    return this.service.removeAuthors(dto.ids);
  }
}
