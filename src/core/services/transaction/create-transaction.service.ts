import { ICreateService } from '@core/domain/interfaces/service.interface';
import { Injectable } from '@nestjs/common';
import { Transaction } from '@core/infrastructure/entities/transaction.entity';
import { TransactionBodyDto } from '@core/domain/dtos/transaction.dto';
import { TransactionRepository } from '@core/infrastructure/repositories/transaction.repository';
import { TransactionFactory } from '@core/domain/factories/transaction.factory';
import { TransactionTypeEnum } from '@core/domain/enums/transaction.enum';
import { UpdateAccountService } from '@services/account/update-account.service';
import { GetAccountService } from '@services/account/get-account.service';
import { Account } from '@core/infrastructure/entities/account.entity';
import { UnprocessableEntityException } from '@shared/exceptions/unprocessable-entity.exception';

@Injectable()
export class CreatetransactionService
  implements ICreateService<TransactionBodyDto, Promise<Transaction>>
{
  constructor(
    private readonly transactionRepository: TransactionRepository,
    private readonly transactionFactory: TransactionFactory,
    private readonly updateAccountService: UpdateAccountService,
    private readonly getAccountService: GetAccountService,
  ) {}

  async create(
    transaction: TransactionBodyDto,
    accountId: number,
  ): Promise<Transaction> {
    const isTransfer = transaction.type == TransactionTypeEnum.TRANSFER;

    let transferDescription = undefined;

    const account = await this.getAccountService.findOne(accountId);
    await this.updateAccountService.delete(transaction, accountId);

    const { isValid, message } = this.validateTransaction(transaction, account);
    if (!isValid) throw new UnprocessableEntityException(message!);

    if (isTransfer) {
      const { description } = await this.createTargetTransaction(
        transaction,
        account,
      );

      transferDescription = description;
    }

    const transactionDto = await this.transactionFactory.create({
      type: transaction.type,
      amount: transaction.amount,
      accountId,
      description: transferDescription,
    });

    const newTransaction =
      await this.transactionRepository.create(transactionDto);

    return newTransaction;
  }

  private async createTargetTransaction(
    transaction: TransactionBodyDto,
    account: Account,
  ): Promise<{ description: string }> {
    const isTargetAccount = true;

    const secondAccount = await this.getAccountService.findOneByNumber(
      transaction.toAccount!,
    );

    const secondAccountDto = await this.transactionFactory.create({
      type: transaction.type,
      amount: transaction.amount,
      accountId: secondAccount.id,
      description: `from account ${account.dataValues.number}`,
    });

    await this.transactionRepository.create(secondAccountDto);
    await this.updateAccountService.delete(
      transaction,
      secondAccount.id,
      isTargetAccount,
    );

    return { description: `to account ${secondAccount.dataValues.number}` };
  }

  private validateTransaction(
    transaction: TransactionBodyDto,
    account: Account,
  ): { isValid: boolean; message?: string } {
    const { type, toAccount } = transaction;

    if (type == TransactionTypeEnum.TRANSFER) {
      if (!toAccount)
        return {
          isValid: false,
          message: 'Target account has not been defined!',
        };

      if (account.number == toAccount)
        return {
          isValid: false,
          message: 'Target account cannot be your own account!',
        };
    }

    return { isValid: true };
  }
}
