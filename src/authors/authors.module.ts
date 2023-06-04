import { Module } from '@nestjs/common';
import { AuthorsService } from './authors.service';
import { AuthorsController } from './authors.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Authors } from '@/authors/authors.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Authors])],
  providers: [AuthorsService],
  controllers: [AuthorsController],
})
export class AuthorsModule {}
