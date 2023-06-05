import { Injectable } from '@nestjs/common';
import { BaseService } from '@base/service/base.service';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import * as exc from '@base/api/exception.reslover';
import { MusicService } from '@/music/music.service';
import { Comments } from './comments.entity';
import { UserService } from '@/user/user.service';
import { AddCommentDto, CommentsDto, UpdateCommentDto } from './comments.dto';
import { PaginateConfig } from '@base/service/paginate/paginate';

@Injectable()
export class CommentService extends BaseService<Comments> {
  constructor(
    @InjectRepository(Comments)
    protected readonly repository: Repository<Comments>,
    private readonly musicService: MusicService,
    private readonly userService: UserService,
  ) {
    super(repository);
  }

  async list(query: CommentsDto) {
    const config: PaginateConfig<Comments> = {
      sortableColumns: ['createdAt'],
      relations: ['user'],
      select: ['user.(avatar)'],
    };
    return this.listWithPage(query, config);
  }

  async getCommentById(commentId: number) {
    return await this.repository.findOne({
      where: { id: commentId },
    });
  }

  async addComment(dto: AddCommentDto) {
    const user = await this.userService.getUserById(dto.userId);
    const music = await this.musicService.getMusic(dto.musicId);
    await this.repository.save({
      user: user,
      music: music,
      content: dto.content,
      star: dto.star,
    });
    return true;
  }

  async updateComment(dto: UpdateCommentDto) {
    const comment = await this.getCommentById(dto.id);
    if (!comment)
      throw new exc.BadException({ message: 'id comment khong ton tai' });

    comment.content = dto.content;
    await comment.save();
    return true;
  }

  async removeComment(commentIds: number[]) {
    for (const id in commentIds) {
      await this.repository.delete(id);
    }

    return true;
  }
}
