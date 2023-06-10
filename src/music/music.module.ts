import { Module } from '@nestjs/common';
import { MusicController } from './music.controller';
import { MusicService } from './music.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Music } from '@/music/music.entity';
import { AuthorsModule } from '@/authors/authors.module';

@Module({
  imports: [TypeOrmModule.forFeature([Music]), AuthorsModule],
  controllers: [MusicController],
  providers: [MusicService],
  exports: [MusicService],
})
export class MusicModule {}
