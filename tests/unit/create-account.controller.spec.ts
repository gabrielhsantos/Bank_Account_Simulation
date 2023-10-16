import { CreateAccountController } from '@app/controllers/account/create-account.controller';
import { AccountBodyDto } from '@core/domain/dtos/account.dto';
import { AccountTypeEnum } from '@core/domain/enums/account.enum';
import { AccountFactory } from '@core/domain/factories/account.factory';
import { Account } from '@core/infrastructure/entities/account.entity';
import { AccountRepository } from '@core/infrastructure/repositories/account.repository';
import { Test, TestingModule } from '@nestjs/testing';
import { CreateAccountService } from '@services/account/create-account.service';
import { BadRequestException } from '@shared/exceptions';

const accountEntity: Partial<Account> = {
  id: 1,
};

const body: AccountBodyDto = {
  type: AccountTypeEnum.CHECKING,
};

describe('CreateAccountController', () => {
  let createAccountController: CreateAccountController;
  let createAccountService: CreateAccountService;
  let accountRepository: AccountRepository;
  let accountFactory: AccountFactory;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CreateAccountController],
      providers: [
        {
          provide: CreateAccountService,
          useValue: {
            create: jest.fn().mockResolvedValue(accountEntity),
          },
        },
        {
          provide: AccountRepository,
          useValue: {
            create: jest.fn().mockResolvedValue(accountEntity),
            findOne: jest.fn().mockResolvedValue(accountEntity),
            findOneByNumber: jest.fn().mockResolvedValue(accountEntity),
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

    createAccountController = module.get<CreateAccountController>(
      CreateAccountController,
    );
    createAccountService =
      module.get<CreateAccountService>(CreateAccountService);
    accountRepository = module.get<AccountRepository>(AccountRepository);
    accountFactory = module.get<AccountFactory>(AccountFactory);
  });

  it('should be defined', () => {
    expect(createAccountController).toBeDefined();
    expect(createAccountService).toBeDefined();
    expect(accountRepository).toBeDefined();
    expect(accountFactory).toBeDefined();
  });

  describe('store', () => {
    it('should create a account successfully', async () => {
      const result = await createAccountController.handle(body);

      expect(createAccountService.create).toHaveBeenCalledWith(body);
      expect(createAccountService.create).toHaveBeenCalledTimes(1);
      expect(result).toHaveProperty('id');
    });
    it('should not create a account with a wrong body', async () => {
      const errorMessage = 'Invalid account type!';

      const wrongBody: any = {
        type: 'FALSE_ENUM',
      };

      jest
        .spyOn(createAccountService, 'create')
        .mockRejectedValue(new BadRequestException(errorMessage));

      expect(createAccountController.handle(wrongBody)).rejects.toThrowError(
        errorMessage,
      );
      expect(createAccountService.create).toHaveBeenCalledWith(wrongBody);
      expect(createAccountService.create).toHaveBeenCalledTimes(1);
    });
  });
});
