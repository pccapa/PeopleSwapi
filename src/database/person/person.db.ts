import { MysqlRepository } from '../base/engines/mysql.base';
import { IRepository } from './repository.interface';
import { PersonDatabaseEntity } from './entities/person.db.entity';
import { ConfigService } from '@nestjs/config';
import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class PersonRepository
  extends MysqlRepository
  implements IRepository<PersonDatabaseEntity>
{
  private readonly logger = new Logger(PersonRepository.name);

  constructor(private configService: ConfigService) {
    super();
    super.setup(this.configService);
  }

  async readAll(page:number,items_per_page:number): Promise<PersonDatabaseEntity[]> {
    let result: PersonDatabaseEntity[] = [];
    try {
      result = await super.executeQuery<PersonDatabaseEntity[]>(
        `call usp_history(${page},${items_per_page});`,
      );
    } catch (error) {
      this.logger.error(error.message);
    }
    return result;
  }

  async create(entity: PersonDatabaseEntity): Promise<PersonDatabaseEntity> {
    try {
      await super.executeQuery<PersonDatabaseEntity[]>(
        `call usp_insertPerson('${entity.name}','${entity.hair_color}', '${entity.skin_color}','${entity.eye_color}','${entity.birth_year}', '${entity.gender}','${entity.homeworld}','${entity.fan_image_url}' ) ;`,
      );
    } catch (error) {
      this.logger.error(error.message);
      throw error;
    }
    return entity;
  }
}
