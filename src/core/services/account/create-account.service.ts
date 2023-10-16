import { ICreateService } from '@core/domain/interfaces/service.interface';
import { Injectable } from '@nestjs/common';
import { Account } from '@core/infrastructure/entities/account.entity';
import { AccountRepository } from '@core/infrastructure/repositories/account.repository';
import { AccountFactory } from '@core/domain/factories/account.factory';
import { AccountBodyDto } from '@core/domain/dtos/account.dto';
import { setAccountNumber } from '@shared/utils/set-account-number';
import { AccountTypeEnum } from '@core/domain/enums/account.enum';
import { BadRequestException } from '@shared/exceptions';

@Injectable()
export class CreateAccountService
  implements ICreateService<AccountBodyDto, Promise<Account>>
{
  constructor(
    private readonly accountRepository: AccountRepository,
    private readonly accountFactory: AccountFactory,
  ) {}

  async create(account: AccountBodyDto): Promise<Account> {
    const type = AccountTypeEnum[account.type];

    if (!type) throw new BadRequestException('Invalid account type!');

    const accountDto = await this.accountFactory.create({
      number: setAccountNumber(),
      type: type,
      balance: 0.0,
      active: true,
    });

    return await this.accountRepository.create(accountDto);
  }
}
