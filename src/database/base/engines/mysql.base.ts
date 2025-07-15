import { ConfigService } from '@nestjs/config';
import mysql from 'mysql2/promise';

export abstract class MysqlRepository {
  private connection: mysql.Connection;
  private settings: {
    host: string;
    user: string;
    password: string;
    database: string;
    connectionLimit: number;
  };

  protected setup(configService: ConfigService) {
    this.settings = {
      host: String(configService.get<string>('DATABASE_HOST')),
      user: String(configService.get<string>('DATABASE_USER')),
      password: String(configService.get<string>('DATABASE_PASSWORD')),
      database: String(configService.get<string>('DATABASE_NAME')),
      connectionLimit: 10,
    };
    this.connection =  mysql.createPool(this.settings);
  }

  constructor() {}

  protected async executeQuery<T>(statement: string): Promise<T> {
    try {
      const resultSet = await this.connection.query(statement);
      return resultSet[0][0] as T;
    } catch (error) {
      console.error('database error', error);
      throw error;
    } finally {
      //this.connection.end();
    }
  }
}
