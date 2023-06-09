import { Injectable } from '@nestjs/common';
import { BaseService } from '@base/service/base.service';
import { Music } from '@/music/music.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as exc from '@base/api/exception.reslover';
import { AddMusicDto, MusicDto } from '@/music/music.dto';
import { PaginateConfig } from '@base/service/paginate/paginate';
import { ApiService } from '@base/http/api.service';
import { UrlService } from '@base/helper/url.service';
@Injectable()
export class MusicService extends BaseService<Music> {
  constructor(
    @InjectRepository(Music)
    protected readonly repository: Repository<Music>,
    private readonly apiService: ApiService,
    private readonly urlService: UrlService,
  ) {
    super(repository);
  }

  async preResponse(musics: Music[]) {
    for (const music of musics) {
      if (music.url) music.url = this.urlService.dataUrl(music.url);
    }
  }

  async listMusic(query: MusicDto) {
    const config: PaginateConfig<Music> = {
      sortableColumns: ['id'],
      relations: ['authors'],
    };

    const data = await this.listWithPage(query, config);
    await this.preResponse(data.results);
    return data;
  }

  async addMusic(dto: AddMusicDto) {
    const callUrl = `http://localhost:5000/predict?songName=${dto.file}`;
    const res = await this.apiService.getAxios(callUrl);
    const genre = res.data.label;

    const music = await this.repository.save({
      genre: genre,
      releaseDate: dto.releaseDate,
      artist: dto.artist,
      url: 'unlabeled/' + dto.file,
      album: dto.album,
      title: dto.title,
      duration: dto.duration,
    });
    return true;
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
