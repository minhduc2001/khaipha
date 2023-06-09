import { Injectable, OnModuleInit } from '@nestjs/common';
import { UserSeed } from '@shared/seeder/user.seed';
import { PermissionSeed } from '@shared/seeder/permission.seed';
import { MusicSeed } from '@shared/seeder/music.seed';
import { HomeSeed } from '@shared/seeder/home.seed';

@Injectable()
export class SeederService implements OnModuleInit {
  constructor(
    private readonly userSeed: UserSeed,
    private readonly permissionSeed: PermissionSeed,
    private readonly musicSeed: MusicSeed,
    private readonly homeSeed: HomeSeed,
  ) {}

  async onModuleInit() {
    console.info('loading seed ...');
    await this.permissionSeed.seed();
    await this.userSeed.seed();
    await this.musicSeed.seed();
    await this.homeSeed.seed();
    console.info('done!!!!');
  }
}
