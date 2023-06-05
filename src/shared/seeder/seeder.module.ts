import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '@/user/entities/user.entity';
import { SeederService } from '@shared/seeder/seeder.service';
import { UserSeed } from '@shared/seeder/user.seed';
import { Permission } from '@/role/entities/permission.entity';
import { PermissionSeed } from '@shared/seeder/permission.seed';
import { MusicSeed } from '@shared/seeder/music.seed';
import { Music } from '@/music/music.entity';
import { Authors } from '@/authors/authors.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Permission, Music, Authors])],
  providers: [SeederService, UserSeed, PermissionSeed, MusicSeed],
})
export class SeedersModule {}
