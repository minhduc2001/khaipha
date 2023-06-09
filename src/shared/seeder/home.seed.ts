import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Home } from '@/home/home.entity';

const data = [
  {
    type: 'authors',
    name: 'Tác giả',
    ref: 'authors',
  },
  {
    type: 'history',
    name: 'Lịch sử',
    ref: 'histories',
  },
  {
    type: 'recommend_music',
    name: 'Có thể bạn thích nghe',
    ref: 'music',
  },
];

@Injectable()
export class HomeSeed {
  constructor(
    @InjectRepository(Home)
    protected readonly repository: Repository<Home>,
  ) {}

  async seed() {
    const count = await this.repository.count();
    if (!count) {
      for (const d of data) {
        await this.repository.save(d);
      }
    }
  }
}
