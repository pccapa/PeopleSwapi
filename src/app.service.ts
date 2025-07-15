import { Injectable, Logger } from '@nestjs/common';
import { PersonDto } from './dto/person.dto';
import { AppointmentDto } from './dto/appointment.dto';
import { AppointmentRepository } from './database/person/appointment.db';
import { SWAPIHttp } from './http/swapi/swapi.http';
import { DragolballHttp } from './http/dragonball/dragonball.http';
import { PersonCache } from './cache/redis/person.cache';
import { PersonRepository } from './database/person/person.db';
import { DragonballHttpEntity } from './http/dragonball/entities/dragonball.http.entity';

@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name);

  constructor(
    private appointmentRepository: AppointmentRepository,
    private PersonRepository: PersonRepository,
    private sWAPIHttp: SWAPIHttp,
    private DragolballHttp: DragolballHttp,
    private PersonCache: PersonCache,
  ) {}

  async getPeople(): Promise<PersonDto[]> {
    const personDto: PersonDto[] = [];

    try {
      const PersonCache = await this.PersonCache.get();
      if (PersonCache) {
        this.logger.log({
          message: 'result from cache',
          data: PersonCache,
        });

        return PersonCache as PersonDto[];
      }

      const personHttp = await this.sWAPIHttp.getRecords();
      this.logger.log({
        message: 'people from swapi api',
        data: personHttp,
      });

      const dragolballList: DragonballHttpEntity =
        await this.DragolballHttp.getRecord();

      this.logger.log({
        message: 'list of dragolball features',
        data: dragolballList,
      });

      for (const item of personHttp) {
        const personAdviceEntity = {
          name: item.name,
          hair_color: item.hair_color,
          skin_color: item.skin_color,
          eye_color: item.eye_color,
          birth_year: item.birth_year,
          gender: item.gender,
          homeworld: item.homeworld,
          fan_image_url:
            dragolballList.items[
              Math.floor(Math.random() * dragolballList.items.length)
            ].image,
        };
        await this.PersonRepository.create(personAdviceEntity);
        personDto.push({ ...personAdviceEntity });
      }

      await this.PersonCache.save(personDto);

      this.logger.log({
        message: 'saved into cache',
      });
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
    return personDto;
  }

  async getHistory(page: number, items_per_page: number): Promise<PersonDto[]> {
    const result: PersonDto[] = [];
    try {
      const resultRepository = await this.PersonRepository.readAll(
        page,
        items_per_page,
      );

      resultRepository.forEach((item) =>
        result.push({
          ...item,
        }),
      );
      this.logger.log({
        message: 'history people',
        data: result,
      });
      return result;
    } catch (error) {
      this.logger.error(error.message);
      throw error;
    }
  }

  async setAppointment(appointment: AppointmentDto) {
    try {
      await this.appointmentRepository.create({ ...appointment });
      this.logger.log({
        message: 'appointment saved',
      });
    } catch (error) {
      this.logger.error(error.message);
      throw error;
    }
  }
}
