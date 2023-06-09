import { config } from '@/config';
import { Injectable } from '@nestjs/common';
import { LoggerService } from '@base/logger';

@Injectable()
export class UrlService {
  constructor(private readonly loggerService: LoggerService) {}
  private logger = this.loggerService.getLogger(UrlService.name);

  uploadUrl(filename: string): string {
    return `http://${config.IP}:${config.PORT}/uploads/${filename}`;
  }

  dataUrl(filename: string): string {
    return `http://${config.IP}:${config.PORT}/audio/${filename}`;
  }
}
