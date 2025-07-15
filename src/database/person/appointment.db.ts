import { MysqlRepository } from '../base/engines/mysql.base';
import { IRepository } from './repository.interface';
import { AppointmentDatabaseEntity } from './entities/appointment.db.entity';
import { ConfigService } from '@nestjs/config';
import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class AppointmentRepository
  extends MysqlRepository
  implements IRepository<AppointmentDatabaseEntity>
{
  private readonly logger = new Logger(AppointmentRepository.name);

  constructor(private configService: ConfigService) {
    super();
    super.setup(this.configService);
  }

  async readAll(): Promise<AppointmentDatabaseEntity[]> {
    throw new Error('Method not implemented.');
  }
  async create(
    entity: AppointmentDatabaseEntity,
  ): Promise<AppointmentDatabaseEntity> {
    try {
      await super.executeQuery<AppointmentDatabaseEntity[]>(
        `call usp_insertAppointment(${entity.personId},'${entity.scheduled_date.replace('T', ' ')}',${entity.total_amount}, '${entity.comment}' ) ;`,
      );
    } catch (error) {
      this.logger.error(error.message);
      throw error;
    }
    return entity;
  }
}
