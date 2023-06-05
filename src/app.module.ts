import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// BASE
import { config } from '@/config';
import { LoggerModule } from '@base/logger/logger.module';
import { dbConfig } from '@base/db/db.config';
import { MailerModule } from '@base/mailer/mailer.module';
import { HelperModule } from '@base/helper/helper.module';

// APPS
import { UserModule } from '@/user/user.module';
import { AuthModule } from '@/auth/auth.module';
import { RoleModule } from '@/role/role.module';

// SHARED
import { SeedersModule } from '@shared/seeder/seeder.module';
import { MusicModule } from './music/music.module';
import { HistoriesModule } from './histories/histories.module';
import { CommentsModule } from './comments/comments.module';
import { AuthorsModule } from './authors/authors.module';
import { HomeModule } from './home/home.module';
import { ApiModule } from '@base/http/api.module';

const appModule = [AuthModule, UserModule, RoleModule, MailerModule];
const baseModule = [LoggerModule, HelperModule, ApiModule];

@Module({
  imports: [
    ...baseModule,
    ...appModule,
    TypeOrmModule.forRoot(dbConfig),
    SeedersModule,
    MusicModule,
    HistoriesModule,
    CommentsModule,
    AuthorsModule,
    HomeModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
