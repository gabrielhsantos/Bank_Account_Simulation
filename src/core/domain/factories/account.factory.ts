import { Account } from '@core/infrastructure/entities/account.entity';
import { AccountDto } from '../dtos/account.dto';

export class AccountFactory {
  public async create(account: AccountDto): Promise<Account> {
    return new Account(account);
  }
}
