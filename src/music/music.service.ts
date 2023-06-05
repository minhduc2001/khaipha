import { Injectable } from '@nestjs/common';
import { BaseService } from '@base/service/base.service';
import { Music } from '@/music/music.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as exc from '@base/api/exception.reslover';
import { AddMusicDto, MusicDto } from '@/music/music.dto';
import { PaginateConfig } from '@base/service/paginate/paginate';
@Injectable()
export class MusicService extends BaseService<Music> {
  constructor(
    @InjectRepository(Music)
    protected readonly repository: Repository<Music>,
  ) {
    super(repository);
  }

  async listMusic(query: MusicDto) {
    const config: PaginateConfig<Music> = {
      sortableColumns: ['id'],
      relations: ['authors'],
    };

    return await this.listWithPage(query, config);
  }

  async addMusic(dto: AddMusicDto) {
    // await this.repository.save({})
  }

  async getMusic(id: number) {
    const music = await this.repository.findOne({ where: { id: id } });
    if (!music) throw new exc.BadException({ message: 'ko co bai nay' });
    return music;
  }

  async getMusicByUrl(url: string) {
    const music = await this.repository.findOne({ where: { url: url } });
    if (!music) throw new exc.BadException({ message: 'ko co bai nay' });
    return music;
  }

  async bulkDelete(ids: number[]) {
    for (const id in ids) {
      await this.repository.delete(id);
    }

    return true;
  }
}
