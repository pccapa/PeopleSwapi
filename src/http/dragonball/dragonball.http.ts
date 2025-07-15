import { Injectable, Logger } from '@nestjs/common';
import { HttpClient } from '../base/http.axios';
import { DragonballHttpEntity } from './entities/dragonball.http.entity';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class DragolballHttp extends HttpClient {
  private readonly logger = new Logger(DragolballHttp.name);

  constructor(private configService: ConfigService) {
    super(String(configService.get<string>('HTTP_BASE_URL_ADVICE')));
    super.setup(this.configService);
  }
  async getRecord(): Promise<DragonballHttpEntity> {
    let adviceEntity: Partial<DragonballHttpEntity> = {};
    try {
      const result = await super.get<DragonballHttpEntity>('/api/characters');
      adviceEntity = {
        ...result,
      };
    } catch (error) {
      this.logger.error(error.message);
      throw error;
    }
    return adviceEntity as DragonballHttpEntity;
  }
}
