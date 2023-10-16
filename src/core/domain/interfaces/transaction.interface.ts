import { Transaction } from '@core/infrastructure/entities/transaction.entity';

export interface ITransactionRepository {
  create(data: Transaction): Promise<Transaction>;
}
