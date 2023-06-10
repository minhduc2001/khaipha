import { Injectable } from '@nestjs/common';
import { BaseService } from '@base/service/base.service';
import { Music } from '@/music/music.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as exc from '@base/api/exception.reslover';
import { AddMusicDto, MusicDto, UpdateMusicDto } from '@/music/music.dto';
import { PaginateConfig } from '@base/service/paginate/paginate';
import { ApiService } from '@base/http/api.service';
import { UrlService } from '@base/helper/url.service';
import { Histories } from '@/histories/histories.entity';
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
      if (music?.image) music.image = this.urlService.uploadUrl(music.image);
    }
  }

  async listMusic(query: MusicDto) {
    const config: PaginateConfig<Music> = {
      sortableColumns: ['id'],
      defaultSortBy: [['updatedAt', 'DESC']],
      relations: ['authors'],
    };

    const data = await this.listWithPage(query, config);
    await this.preResponse(data.results);
    return data;
  }

  async addMusic(dto: AddMusicDto) {
    try {
      const callUrl = `http://localhost:5000/predict?songName=${dto.audio}`;
      const res = await this.apiService.getAxios(callUrl);
      const genre = res.data.label;

      const music = await this.repository.save({
        genre: genre,
        releaseDate: dto.releaseDate,
        artist: dto.artist,
        url: 'unlabeled/' + dto.audio,
        album: dto.album,
        title: dto.title,
        duration: dto.duration,
        image: dto.image,
      });

      // console.log(music);
      return music;
    } catch (e) {
      throw new exc.BadRequest({ message: e.message });
    }
  }

  async updateMusic(dto: UpdateMusicDto) {
    try {
      let genre = null;
      if (dto.audio) {
        const callUrl = `http://localhost:5000/predict?songName=${dto.audio}`;
        const res = await this.apiService.getAxios(callUrl);
        genre = res.data.label;
      }
      const music = await this.getMusicWithoutImage(dto.id);
      return this.repository.update(dto.id, {
        genre: genre ?? music.genre,
        releaseDate: dto.releaseDate,
        artist: dto.artist,
        url: dto.audio ? 'unlabeled/' + dto.audio : music.url,
        album: dto.album,
        title: dto.title,
        duration: dto.duration,
        image: dto.image ?? music.image,
      });
    } catch (e) {
      throw new exc.BadRequest({ message: e.message });
    }
  }

  async listMusicRamdom(genre: string) {
    const query = this.repository.createQueryBuilder('music').select();

    if (genre != null) {
      query.where({ genre: genre });
    }

    query.orderBy('RANDOM()').limit(5);
    const data = await query.getMany();
    await this.preResponse(data);
    return data;
  }

  async getMusic(id: number) {
    const music = await this.repository.findOne({
      where: { id: id },
      relations: { authors: true },
    });
    if (!music) throw new exc.BadException({ message: 'ko co bai nay' });
    await this.preResponse([music]);
    return music;
  }

  async getMusicWithoutImage(id: number) {
    const music = await this.repository.findOne({
      where: { id: id },
    });
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
