import { Injectable } from '@nestjs/common';
import { BaseService } from '@base/service/base.service';
import { Home } from '@/home/home.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PaginateConfig } from '@base/service/paginate/paginate';
import { HistoriesService } from '@/histories/histories.service';
import { MusicService } from '@/music/music.service';
import { AuthorsService } from '@/authors/authors.service';
import { HomeDto } from '@/home/home.dto';
import { ApiService } from '@base/http/api.service';
import { Recommend } from '@/home/home.interface';
import { map } from 'rxjs/operators';

@Injectable()
export class HomeService extends BaseService<Home> {
  constructor(
    @InjectRepository(Home)
    protected readonly repository: Repository<Home>,
    private readonly historiesService: HistoriesService,
    private readonly musicService: MusicService,
    private readonly authorsService: AuthorsService,
    private readonly apiService: ApiService,
  ) {
    super(repository);
  }

  async getHome(query: HomeDto) {
    const config: PaginateConfig<Home> = {
      sortableColumns: ['id'],
    };
    const home = await this.listWithPage(query, config);
    const data = [];
    for (const value of home.results) {
      if (value.ref == 'histories') {
        const resp = await this.historiesService.listHistory({
          filter: { ['user.(id)']: query.user.id.toString() },
          limit: 10,
        });

        data.push(resp.results);
      }
    }
    home.results = data;
    return home;
  }

  async handleRecommendByMusic(id: number) {
    const music = await this.musicService.getMusic(id);
    let tmp = music.url?.split('/')?.[2];
    if (!tmp) tmp = music.url;
    const url = `http://localhost:5000/recommend?songName=${tmp}&minN=5`;
    const res = await this.apiService.getAxios(url);
    const data = res.data.data;

    const promises = Object.keys(data).map(async (key, index) => {
      const dir = (data[key] + '').split('.')[0];
      const newUrl = `genres_original/${dir}/${data[key]}`;
      const musicR = await this.musicService.getMusicByUrl(newUrl);
      return musicR;
    });

    return await Promise.all(promises);
  }
}
