import { Injectable } from '@nestjs/common';
import { RedisCache } from '../base/redis.cache';
import { PersonCacheEntity } from './entities/person.cache.entity';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PersonCache extends RedisCache {
  private key: string;
  private expirationSeconds: number;

  constructor(private configService: ConfigService) {
    super();
    super.setup(this.configService);
    this.key = String(configService.get<string>('REDIS_NAME_KEY'));
    this.expirationSeconds = Number(
      configService.get<number>('REDIS_EXPIRATION_KEY_SECONDS'),
    );
  }

  async save(entity: PersonCacheEntity[]) {
    await super.saveString(
      this.key,
      JSON.stringify(entity),
      this.expirationSeconds,
    );
  }

  async get(): Promise<PersonCacheEntity[] | null> {
    const entity = await super.getString(this.key);
    if (entity) return JSON.parse(String(entity)) as PersonCacheEntity[];
    return null;
  }
}
