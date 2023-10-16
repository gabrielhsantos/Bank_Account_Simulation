import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { IAccountRepository } from '@core/domain/interfaces/account.interface';
import { Account } from '../entities/account.entity';
import { Transaction } from '../entities/transaction.entity';

@Injectable()
export class AccountRepository implements IAccountRepository {
  constructor(
    @InjectModel(Account)
    private readonly accountModel: typeof Account,
  ) {}

  async create({ dataValues }: Account): Promise<Account> {
    return await this.accountModel.create(dataValues);
  }

  async findOne(accountId: number): Promise<Account | null> {
    return await this.accountModel.findOne({
      where: { id: accountId, active: true },
      include: [{ model: Transaction, required: false }],
      order: [
        [{ model: Transaction, as: 'transactions' }, 'createdAt', 'DESC'],
      ],
    });
  }

  async findOneByNumber(number: string): Promise<Account | null> {
    return await this.accountModel.findOne({
      where: { number, active: true },
      include: [{ model: Transaction, required: false }],
      order: [
        [{ model: Transaction, as: 'transactions' }, 'createdAt', 'DESC'],
      ],
    });
  }

  async findAll(): Promise<Account[]> {
    return await this.accountModel.findAll({
      include: [{ model: Transaction, required: false }],
      order: [
        ['id', 'ASC'],
        [{ model: Transaction, as: 'transactions' }, 'createdAt', 'DESC'],
      ],
    });
  }

  async update({ dataValues }: Account, accountId: number): Promise<void> {
    const { balance, active } = dataValues;

    await this.accountModel.update(
      { balance, active },
      { where: { id: accountId } },
    );
  }
}
