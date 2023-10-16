import { Account } from '@core/infrastructure/entities/account.entity';

export interface IAccountRepository {
  create(data: Account): Promise<Account>;
  findOne(accountId: number): Promise<Account | null>;
  findOneByNumber(number: string): Promise<Account | null>;
  findAll(): Promise<Account[]>;
  update(data: Partial<Account>, accountId: number): Promise<void>;
}
