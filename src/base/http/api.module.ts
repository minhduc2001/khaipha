import { Global, Module } from '@nestjs/common';
import { ApiService } from '@base/http/api.service';
import { HttpModule } from '@nestjs/axios';

@Global()
@Module({
  imports: [HttpModule],
  providers: [ApiService],
  controllers: [],
  exports: [ApiService, HttpModule],
})
export class ApiModule {}
