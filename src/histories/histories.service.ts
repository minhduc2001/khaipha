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
import { UrlService } from '@base/helper/url.service';

@Injectable()
export class HistoriesService extends BaseService<Histories> {
  constructor(
    @InjectRepository(Histories)
    protected readonly repository: Repository<Histories>,
    private readonly musicService: MusicService,
    private readonly urlService: UrlService,
  ) {
    super(repository);
  }

  async preResponse(histories: Histories[]) {
    for (const history of histories) {
      if (history?.music?.url)
        history.music.url = this.urlService.dataUrl(history.music.url);
      if (history?.music?.image)
        history.music.image = this.urlService.uploadUrl(history.music.image);
    }
  }

  async listHistory(query: HistoriesDto) {
    const config: PaginateConfig<Histories> = {
      sortableColumns: ['id'],
      relations: ['music'],
    };

    const data = await this.listWithPage(query, config);
    await this.preResponse(data.results);
    return data;
  }

  async listHome(query: HistoriesHomeDto) {
    const config: PaginateConfig<Histories> = {
      sortableColumns: ['id'],
      defaultSortBy: [['updatedAt', 'DESC']],
      relations: ['music'],
      where: { user: { id: query.userId } },
    };

    // const queryB = this.repository
    //   .createQueryBuilder('music')
    //   .where({ user: { id: query.userId } });
    delete query.userId;

    const data = await this.listWithPage(query, config);
    await this.preResponse(data.results);
    return data;
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

  async count(userId: number, genre: string) {
    return await this.repository.count({
      where: {
        user: { id: userId },
        music: { genre: genre },
      },
    });
  }
}
