import { Injectable } from '@nestjs/common';
import { BaseService } from '@base/service/base.service';
import { Music } from '@/music/music.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as exc from '@base/api/exception.reslover';
@Injectable()
export class MusicService extends BaseService<Music> {
  constructor(
    @InjectRepository(Music)
    protected readonly repository: Repository<Music>,
  ) {
    super(repository);
  }

  async getMusic(id: number) {
    const music = await this.repository.findOne({ where: { id: id } });
    if (!music) throw new exc.BadException({ message: 'ko co bai nay' });
    return music;
  }
}
