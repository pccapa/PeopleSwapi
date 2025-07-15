import { Injectable, Logger } from '@nestjs/common';
import { HttpClient } from '../base/http.axios';
import { PersonHttpEntity } from './entities/person.http.entity';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SWAPIHttp extends HttpClient {
  private readonly logger = new Logger(SWAPIHttp.name);

  constructor(private configService: ConfigService) {
    super(String(configService.get<string>('HTTP_BASE_URL_SWAPI')));
    super.setup(this.configService);
  }

  async getRecords(): Promise<PersonHttpEntity[]> {
    const personEntity: PersonHttpEntity[] = [];
    try {
      const result = await super.get<PersonHttpEntity[]>('/people');
      result.forEach((item) =>
        personEntity.push({
          name: item.name,
          hair_color: item.hair_color,
          skin_color: item.skin_color,
          eye_color: item.eye_color,
          birth_year: item.birth_year,
          gender: item.gender,
          homeworld: item.homeworld,
        }),
      );
    } catch (error) {
      this.logger.error(error.message);
      throw error;
    }
    return personEntity;
  }
}
