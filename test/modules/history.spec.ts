import request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { PeopleDatabaseMock } from './mocks/database/history.database.mock';
import { HistoryCacheMock } from './response/history.response.mock';
import { AppModule } from '../../src/app.module';
import { PersonRepository } from '../../src/database/person/person.db';

describe('History', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(PersonRepository)
      .useValue({
        readAll: () => Promise.resolve(PeopleDatabaseMock),
      })
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  test(`Should get history data`, () => {
    //act
    const response = request(app.getHttpServer()).get('/people/history?page1&items_per_page=10');

    //asset
    response.expect(200).expect(HistoryCacheMock);
  });

  afterAll(async () => {
    await app.close();
  });
});
