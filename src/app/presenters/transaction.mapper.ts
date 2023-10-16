import { TransactionDto } from '@core/domain/dtos/transaction.dto';
import { Transaction } from '@core/infrastructure/entities/transaction.entity';

export const TransactionResponse = (
  transaction: Transaction,
): TransactionDto => {
  return {
    id: transaction.id!,
    accountId: transaction.accountId,
    description: transaction.description,
    type: transaction.type,
    amount: transaction.amount,
  };
};
