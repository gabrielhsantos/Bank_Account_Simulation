import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '@modules/app.module';
import { TestModule } from '@modules/test/test.module';
import { TestSetupService } from '../setupTests';

describe('CreateBookController (e2e)', () => {
  let app: INestApplication;
  let testSetupService: TestSetupService;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule, TestModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    testSetupService = moduleFixture.get(TestSetupService);
  });

  afterAll(async () => {
    await app.close();
  });

  it('/POST /accounts/:id/transactions', async () => {
    const { id } = await testSetupService.setupAccount();

    const newTransaction = {
      type: 'DEPOSIT',
      amount: 100.0,
    };

    const response = await request(app.getHttpServer())
      .post(`/accounts/${id}/transactions`)
      .send(newTransaction);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
  });
});
