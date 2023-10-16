import { TransactionDto } from '../dtos/transaction.dto';
import { Transaction } from '@core/infrastructure/entities/transaction.entity';

export class TransactionFactory {
  public async create(transaction: TransactionDto): Promise<Transaction> {
    return new Transaction(transaction);
  }
}
