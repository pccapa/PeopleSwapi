import request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../../src/app.module';
import { AppointmentRepository } from '../../src/database/person/appointment.db';
import { AppointmentRequestMock } from './request/history.request.mock';

describe('Appointment', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(AppointmentRepository)
      .useValue({
        create: () => Promise.resolve(null),
      })
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  test(`Should add an appointment`, () => {
    //act
    const response = request(app.getHttpServer())
      .post('/people/appointment')
      .send(AppointmentRequestMock);

    //asset
    response.expect(204);
  });

  afterAll(async () => {
    await app.close();
  });
});
