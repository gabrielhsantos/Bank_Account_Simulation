import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '@modules/app.module';
import { AccountTypeEnum } from '@core/domain/enums/account.enum';
import { TestModule } from '@modules/test/test.module';
import { TestSetupService } from '../setupTests';

describe('Account (e2e)', () => {
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

  it('/POST /accounts', async () => {
    const newAccount = {
      type: AccountTypeEnum.CHECKING,
    };

    const response = await request(app.getHttpServer())
      .post(`/accounts`)
      .send(newAccount);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
  });

  it('/GET /accounts', async () => {
    await testSetupService.setupAccount();
    await testSetupService.setupAccount();

    const response = await request(app.getHttpServer()).get(`/accounts`);

    expect(response.status).toBe(200);
  });

  it('/GET /accounts/:id', async () => {
    const { id } = await testSetupService.setupAccount();

    const response = await request(app.getHttpServer()).get(`/accounts/${id}`);

    expect(response.status).toBe(200);
  });

  it('/DELETE /accounts/:id', async () => {
    const { id } = await testSetupService.setupAccount();

    const response = await request(app.getHttpServer()).delete(
      `/accounts/${id}`,
    );

    expect(response.status).toBe(204);
  });
});
