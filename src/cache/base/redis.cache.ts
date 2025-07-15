import { ConfigService } from '@nestjs/config';
import Redis, { Cluster } from 'ioredis';

export abstract class RedisCache {
  private redisClient: Cluster;
  private settings: {
    port: number;
    host: string;
    username: string;
    password?: string;
    db: 0;
  };
  constructor() {}

  protected setup(configService: ConfigService) {
    this.settings = {
      port: Number(configService.get<number>('REDIS_PORT')),
      host: String(configService.get<string>('REDIS_HOST')),
      username: String(configService.get<string>('REDIS_USER')),
      db: 0,
    };
  }

  protected async getString(key: string): Promise<string | null> {
    this.redisClient = new Redis.Cluster(
      [{ host: this.settings.host, port: this.settings.port }],
      {
        dnsLookup: (address, callback) => callback(null, address),
        redisOptions: {
          tls: {},
        },
      },
    );
    const result = await this.redisClient.get(key);
    this.redisClient.disconnect();
    return result;
  }

  protected async saveString(
    key: string,
    value: string,
    expirationSeconds: number,
  ): Promise<void> {
    this.redisClient = new Redis.Cluster(
      [{ host: this.settings.host, port: this.settings.port }],
      {
        dnsLookup: (address, callback) => callback(null, address),
        redisOptions: {
          tls: {},
        },
      },
    );

    await this.redisClient.set(key, value, 'EX', expirationSeconds);
    this.redisClient.disconnect();
  }
}
