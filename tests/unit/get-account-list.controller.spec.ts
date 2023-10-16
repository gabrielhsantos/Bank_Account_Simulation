import { GetAccountListController } from '@app/controllers/account/get-account-list.controller';
import { AccountTypeEnum } from '@core/domain/enums/account.enum';
import { Account } from '@core/infrastructure/entities/account.entity';
import { AccountRepository } from '@core/infrastructure/repositories/account.repository';
import { Test, TestingModule } from '@nestjs/testing';
import { GetAccountListService } from '@services/account/get-account-list.service';

const accountEntityList: Partial<Account>[] = [
  {
    id: 1,
    number: '17010-8',
    type: AccountTypeEnum.CHECKING,
    balance: 600,
    active: true,
    transactions: [],
  },
  {
    id: 2,
    number: '12345-6',
    type: AccountTypeEnum.CHECKING,
    balance: 1000,
    active: true,
    transactions: [],
  },
];

describe('GetAccountListController', () => {
  let getAccountListController: GetAccountListController;
  let getAccountListService: GetAccountListService;
  let accountRepository: AccountRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GetAccountListController],
      providers: [
        {
          provide: GetAccountListService,
          useValue: {
            findAll: jest.fn().mockResolvedValue(accountEntityList),
          },
        },
        {
          provide: AccountRepository,
          useValue: {
            findAll: jest.fn().mockResolvedValue(accountEntityList),
          },
        },
      ],
    }).compile();

    getAccountListController = module.get<GetAccountListController>(
      GetAccountListController,
    );
    getAccountListService = module.get<GetAccountListService>(
      GetAccountListService,
    );
    accountRepository = module.get<AccountRepository>(AccountRepository);
  });

  it('should be defined', () => {
    expect(getAccountListController).toBeDefined();
    expect(getAccountListService).toBeDefined();
    expect(accountRepository).toBeDefined();
  });

  describe('store', () => {
    it('should get a account list successfully', async () => {
      const result = await getAccountListController.handle();

      expect(getAccountListService.findAll).toHaveBeenCalledTimes(1);
      expect(result).toHaveLength(2);
    });
  });
});
