import { Module } from '@nestjs/common';
import { HistoriesService } from './histories.service';
import { HistoriesController } from './histories.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Histories } from '@/histories/histories.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Histories])],
  providers: [HistoriesService],
  controllers: [HistoriesController],
})
export class HistoriesModule {}
