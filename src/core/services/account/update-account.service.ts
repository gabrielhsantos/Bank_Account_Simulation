import { IUpdateService } from '@core/domain/interfaces/service.interface';
import { Injectable } from '@nestjs/common';
import { Account } from '@core/infrastructure/entities/account.entity';
import { AccountRepository } from '@core/infrastructure/repositories/account.repository';
import { NotFoundException } from '@shared/exceptions';
import { AccountFactory } from '@core/domain/factories/account.factory';
import { TransactionBodyDto } from '@core/domain/dtos/transaction.dto';
import { TransactionTypeEnum } from '@core/domain/enums/transaction.enum';
import { UnprocessableEntityException } from '@shared/exceptions/unprocessable-entity.exception';

@Injectable()
export class UpdateAccountService
  implements IUpdateService<TransactionBodyDto, Promise<void>>
{
  constructor(
    private readonly accountRepository: AccountRepository,
    private readonly accountFactory: AccountFactory,
  ) {}

  async delete(
    transactionBodyDto: TransactionBodyDto,
    accountId?: number,
    isTargetAccount?: boolean,
  ): Promise<void> {
    const account = await this.accountRepository.findOne(accountId!);

    if (!account) {
      throw new NotFoundException('Account not found!');
    }

    const { isValid, message } = this.validateUpdateAccount(
      account,
      transactionBodyDto,
      isTargetAccount,
    );
    if (!isValid) throw new UnprocessableEntityException(message!);

    const updateAccountDto = await this.accountFactory.create({
      number: account.number,
      type: account.type,
      balance: this.setNewBalance(account, transactionBodyDto, isTargetAccount),
      active: true,
    });

    await this.accountRepository.update(updateAccountDto, account.id);
  }

  private validateUpdateAccount(
    account: Account,
    transactionBodyDto: TransactionBodyDto,
    isTargetAccount?: boolean,
  ): { isValid: boolean; message?: string } {
    const { type, amount } = transactionBodyDto;
    const balance = account.balance;

    if (!amount || amount == 0)
      return {
        isValid: false,
        message: 'Invalid amount value!',
      };

    if (type == TransactionTypeEnum.WITHDRAWAL) {
      if (balance - amount < 0)
        return {
          isValid: false,
          message: 'Withdrawal amount exceeds balance!',
        };
    }

    if (type == TransactionTypeEnum.TRANSFER && !isTargetAccount) {
      if (balance - amount < 0)
        return {
          isValid: false,
          message: 'Transfer amount exceeds balance!',
        };
    }

    return { isValid: true };
  }

  private setNewBalance(
    account: Account,
    transactionBodyDto: TransactionBodyDto,
    isTargetAccount?: boolean,
  ): number {
    const { type, amount } = transactionBodyDto;
    let newBalance: number = account.balance;

    switch (type) {
      case TransactionTypeEnum.DEPOSIT:
        newBalance = account.balance + amount;
        break;
      case TransactionTypeEnum.WITHDRAWAL:
        newBalance = account.balance - amount;
        break;
      case TransactionTypeEnum.TRANSFER:
        if (isTargetAccount) {
          newBalance = account.balance + amount;
        } else {
          newBalance = account.balance - amount;
        }
        break;
    }

    return newBalance;
  }
}
