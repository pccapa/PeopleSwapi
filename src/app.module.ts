import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PersonRepository } from './database/person/person.db';
import { AppointmentRepository } from './database/person/appointment.db';
import { DragolballHttp } from './http/dragonball/dragonball.http';
import { SWAPIHttp } from './http/swapi/swapi.http';
import { PersonCache } from './cache/redis/person.cache';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true })],
  controllers: [AppController],
  providers: [
    AppService,
    PersonRepository,
    AppointmentRepository,
    DragolballHttp,
    SWAPIHttp,
    PersonCache,
  ],
})
export class AppModule {}
