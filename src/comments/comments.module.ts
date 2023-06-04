import { Module } from '@nestjs/common';
import { CommentsController } from './comments.controller';
import { CommentService } from './comments.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comments } from '@/comments/comments.entity';
import { MusicModule } from '@/music/music.module';
import { UserModule } from '@/user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([Comments]), MusicModule, UserModule],
  controllers: [CommentsController],
  providers: [CommentService],
})
export class CommentsModule {}
