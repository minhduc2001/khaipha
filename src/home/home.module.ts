import { Module } from '@nestjs/common';
import { HomeService } from './home.service';
import { HomeController } from './home.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Home } from '@/home/home.entity';
import { MusicModule } from '@/music/music.module';
import { HistoriesModule } from '@/histories/histories.module';
import { AuthorsModule } from '@/authors/authors.module';
import { UserModule } from '@/user/user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Home]),
    MusicModule,
    HistoriesModule,
    AuthorsModule,
    UserModule,
  ],
  providers: [HomeService],
  controllers: [HomeController],
})
export class HomeModule {}
