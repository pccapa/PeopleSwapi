import request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { HistoryCacheMock } from './response/history.response.mock';
import { AppModule } from '../../src/app.module';
import { PersonRepository } from '../../src/database/person/person.db';
import { SWAPIHttp } from '../../src/http/swapi/swapi.http';
import { SwapiHtttpMock } from './mocks/http/swapi.http.mock';
import { DragolballHttp } from '../../src/http/dragonball/dragonball.http';
import { AdviceHtttpMock } from './mocks/http/dragonball.http.mock';
import { PersonCache } from '../../src/cache/redis/person.cache';

describe('Advices', () => {
  let app: INestApplication;
  let dataFromCache: unknown;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(SWAPIHttp)
      .useValue({
        getRecords: () => Promise.resolve(SwapiHtttpMock),
      })
      .overrideProvider(DragolballHttp)
      .useValue({
        getRecord: () => Promise.resolve(AdviceHtttpMock),
      })
      .overrideProvider(PersonCache)
      .useValue({
        get: () => Promise.resolve(dataFromCache),
        save: () => Promise.resolve(null),
      })
        .overrideProvider(PersonRepository)
      .useValue({
        create: () => Promise.resolve(null),
      })
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  test(`Should get advices from HTTP`, async () => {
    //arrange
    dataFromCache = null;

    //act
    const response = await request(app.getHttpServer()).get('/people');

    //asset
    expect(response.status).toEqual(200);
    expect(response.body).toHaveLength(4);
  });

  test(`Should get advices from cache`, async () => {
    //arrange
    dataFromCache = HistoryCacheMock;

    //act
    const response = await request(app.getHttpServer()).get('/people');

    //asset
    expect(response.status).toEqual(200);
    expect(response.body).toHaveLength(2);
  });

  afterEach(async () => {
    await app.close();
  });
});
