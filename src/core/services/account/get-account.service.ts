import { IFindOneService } from '@core/domain/interfaces/service.interface';
import { Injectable } from '@nestjs/common';
import { Account } from '@core/infrastructure/entities/account.entity';
import { AccountRepository } from '@core/infrastructure/repositories/account.repository';
import { NotFoundException } from '@shared/exceptions';

@Injectable()
export class GetAccountService
  implements IFindOneService<number, Promise<Account>>
{
  constructor(private readonly accountRepository: AccountRepository) {}

  async findOne(accountId: number): Promise<Account> {
    const account = await this.accountRepository.findOne(accountId);

    if (!account) {
      throw new NotFoundException('Account not found!');
    }

    return account;
  }

  async findOneByNumber(number: string): Promise<Account> {
    const account = await this.accountRepository.findOneByNumber(number);

    if (!account) {
      throw new NotFoundException('Account not found!');
    }

    return account;
  }
}
