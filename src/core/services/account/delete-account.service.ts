import { IUpdateService } from '@core/domain/interfaces/service.interface';
import { Injectable } from '@nestjs/common';
import { AccountRepository } from '@core/infrastructure/repositories/account.repository';
import { NotFoundException } from '@shared/exceptions';
import { AccountFactory } from '@core/domain/factories/account.factory';

@Injectable()
export class DeleteAccountService
  implements IUpdateService<number, Promise<void>>
{
  constructor(
    private readonly accountRepository: AccountRepository,
    private readonly accountFactory: AccountFactory,
  ) {}

  async delete(accountId: number): Promise<void> {
    const account = await this.accountRepository.findOne(accountId!);

    if (!account) {
      throw new NotFoundException('Account not found!');
    }

    const updateAccountDto = await this.accountFactory.create({
      number: account.number,
      type: account.type,
      balance: account.balance,
      active: false,
    });

    await this.accountRepository.update(updateAccountDto, account.id);
  }
}
