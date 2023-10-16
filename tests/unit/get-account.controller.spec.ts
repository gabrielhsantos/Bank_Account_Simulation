import { GetAccountController } from '@app/controllers/account/get-account.controller';
import { AccountTypeEnum } from '@core/domain/enums/account.enum';
import { Account } from '@core/infrastructure/entities/account.entity';
import { AccountRepository } from '@core/infrastructure/repositories/account.repository';
import { Test, TestingModule } from '@nestjs/testing';
import { GetAccountService } from '@services/account/get-account.service';
import { NotFoundException } from '@shared/exceptions';

const accountEntity: Partial<Account> = {
  id: 1,
  number: '17010-8',
  type: AccountTypeEnum.CHECKING,
  balance: 600,
  active: true,
  transactions: [],
};

describe('GetAccountController', () => {
  let getAccountController: GetAccountController;
  let getAccountService: GetAccountService;
  let accountRepository: AccountRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GetAccountController],
      providers: [
        {
          provide: GetAccountService,
          useValue: {
            findOne: jest.fn().mockResolvedValue(accountEntity),
            findOneByNumber: jest.fn().mockResolvedValue(accountEntity),
          },
        },
        {
          provide: AccountRepository,
          useValue: {
            findOne: jest.fn().mockResolvedValue(accountEntity),
            findOneByNumber: jest.fn().mockResolvedValue(accountEntity),
          },
        },
      ],
    }).compile();

    getAccountController =
      module.get<GetAccountController>(GetAccountController);
    getAccountService = module.get<GetAccountService>(GetAccountService);
    accountRepository = module.get<AccountRepository>(AccountRepository);
  });

  it('should be defined', () => {
    expect(getAccountController).toBeDefined();
    expect(getAccountService).toBeDefined();
    expect(accountRepository).toBeDefined();
  });

  describe('store', () => {
    it('should get a account successfully', async () => {
      const result = await getAccountController.handle({ id: '1' });

      expect(getAccountService.findOne).toHaveBeenCalledTimes(1);
      expect(result).toHaveProperty('id');
    });

    it('should not get a account with a wrong id', async () => {
      const errorMessage = 'Account not found!';

      jest.spyOn(accountRepository, 'findOne').mockResolvedValue(null);

      jest
        .spyOn(getAccountService, 'findOne')
        .mockRejectedValue(new NotFoundException(errorMessage));

      expect(getAccountController.handle({ id: '123' })).rejects.toThrowError(
        errorMessage,
      );
      expect(getAccountService.findOne).toHaveBeenCalledTimes(1);
    });
  });
});
