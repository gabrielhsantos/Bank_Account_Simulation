import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ITransactionRepository } from '@core/domain/interfaces/transaction.interface';
import { Transaction } from '../entities/transaction.entity';

@Injectable()
export class TransactionRepository implements ITransactionRepository {
  constructor(
    @InjectModel(Transaction)
    private readonly transactionModel: typeof Transaction,
  ) {}

  async create({ dataValues }: Transaction): Promise<Transaction> {
    return await this.transactionModel.create(dataValues);
  }
}
