import {
  Body,
  Controller,
  Delete,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { BulkIdsDto, ParamIdDto } from '@shared/dtos/common.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/auth/guard/jwt-auth.guard';
import { CommentService } from './comments.service';
import { AddCommentDto, UpdateCommentDto } from './comments.dto';

@Controller('comments')
@ApiTags('Comments')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class CommentsController {
  constructor(private readonly service: CommentService) {}

  @Post()
  async add(@Body() dto: AddCommentDto) {
    return this.service.addComment(dto);
  }

  @Put(':id')
  async update(@Param() param: ParamIdDto, @Body() dto: UpdateCommentDto) {
    return this.service.updateComment({
      ...param,
      ...dto,
    });
  }

  @Delete()
  async delete(@Body() dto: BulkIdsDto) {
    return this.service.removeComment(dto.ids);
  }
}
