import { Injectable } from '@nestjs/common';
import { BaseService } from '@base/service/base.service';
import { Histories } from '@/histories/histories.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import {
  AddHistoriesDto,
  HistoriesDto,
  HistoriesHomeDto,
  UpdateHistoriesDto,
} from '@/histories/histories.dto';
import { PaginateConfig } from '@base/service/paginate/paginate';

import * as exc from '@base/api/exception.reslover';
import { MusicService } from '@/music/music.service';

@Injectable()
export class HistoriesService extends BaseService<Histories> {
  constructor(
    @InjectRepository(Histories)
    protected readonly repository: Repository<Histories>,
    private readonly musicService: MusicService,
  ) {
    super(repository);
  }

  async listHistory(query: HistoriesDto) {
    const config: PaginateConfig<Histories> = {
      sortableColumns: ['id'],
      relations: ['music'],
    };

    return this.listWithPage(query, config);
  }

  async listHome(query: HistoriesHomeDto) {
    const config: PaginateConfig<Histories> = {
      sortableColumns: ['id'],
      relations: ['music'],
      where: { user: { id: query.userId } },
    };

    // const queryB = this.repository
    //   .createQueryBuilder('music')
    //   .where({ user: { id: query.userId } });
    delete query.userId;

    return this.listWithPage(query, config);
  }

  async addHistories(dto: AddHistoriesDto) {
    const music = await this.musicService.getMusic(dto.musicId);
    return this.repository.save({
      user: dto.user,
      music: music,
    });
  }

  async getHistories(musicId: number, userId: number) {
    const history = await this.repository.findOne({
      where: {
        user: { id: userId },
        music: { id: musicId },
      },
    });

    return history;
  }
  async updateHistories(dto: UpdateHistoriesDto) {
    const history = await this.getHistories(dto.musicId, dto.user.id);
    if (!history)
      return this.addHistories({ user: dto.user, musicId: dto.musicId });
    history.duration = dto.duration;
    history.position = dto.position;
    await history.save();
    return true;
  }
}
