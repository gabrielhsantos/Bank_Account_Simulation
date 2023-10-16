import { DeleteAccountController } from '@app/controllers/account/delete-account.controller';
import { AccountTypeEnum } from '@core/domain/enums/account.enum';
import { AccountFactory } from '@core/domain/factories/account.factory';
import { Account } from '@core/infrastructure/entities/account.entity';
import { AccountRepository } from '@core/infrastructure/repositories/account.repository';
import { Test, TestingModule } from '@nestjs/testing';
import { DeleteAccountService } from '@services/account/delete-account.service';
import { NotFoundException } from '@shared/exceptions';

const accountEntity: Partial<Account> = {
  id: 1,
  number: '17010-8',
  type: AccountTypeEnum.CHECKING,
  balance: 600,
  active: true,
  transactions: [],
};

describe('DeleteAccountController', () => {
  let deleteAccountController: DeleteAccountController;
  let deleteAccountService: DeleteAccountService;
  let accountRepository: AccountRepository;
  let accountFactory: AccountFactory;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DeleteAccountController],
      providers: [
        {
          provide: DeleteAccountService,
          useValue: {
            delete: jest.fn().mockResolvedValue(accountEntity),
          },
        },
        {
          provide: AccountRepository,
          useValue: {
            findOne: jest.fn().mockResolvedValue(accountEntity),
          },
        },
        {
          provide: AccountFactory,
          useValue: {
            create: jest.fn().mockResolvedValue(accountEntity),
          },
        },
      ],
    }).compile();

    deleteAccountController = module.get<DeleteAccountController>(
      DeleteAccountController,
    );
    deleteAccountService =
      module.get<DeleteAccountService>(DeleteAccountService);
    accountRepository = module.get<AccountRepository>(AccountRepository);
    accountFactory = module.get<AccountFactory>(AccountFactory);
  });

  it('should be defined', () => {
    expect(deleteAccountController).toBeDefined();
    expect(deleteAccountService).toBeDefined();
    expect(accountRepository).toBeDefined();
    expect(accountFactory).toBeDefined();
  });

  describe('store', () => {
    it('should delete a account successfully', async () => {
      expect(await deleteAccountController.handle({ id: '1' }));
      expect(deleteAccountService.delete).toHaveBeenCalledTimes(1);
    });

    it('should not delete a account with a wrong id', async () => {
      const errorMessage = 'Account not found!';

      jest.spyOn(accountRepository, 'findOne').mockResolvedValue(null);

      jest
        .spyOn(deleteAccountService, 'delete')
        .mockRejectedValue(new NotFoundException(errorMessage));

      expect(
        deleteAccountController.handle({ id: '123' }),
      ).rejects.toThrowError(errorMessage);
      expect(deleteAccountService.delete).toHaveBeenCalledTimes(1);
    });
  });
});
