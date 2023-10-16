import { AccountDto } from '@core/domain/dtos/account.dto';
import { Account } from '@core/infrastructure/entities/account.entity';

export const AccountResponse = (account: Account): AccountDto => {
  return {
    id: account.id,
    number: account.number,
    type: account.type,
    balance: account.balance,
    active: account.active,
    transactions: account.transactions?.map((transaction) => {
      return {
        type: transaction.type,
        amount: transaction.amount,
        description: transaction.description,
        date: transaction.createdAt,
      };
    }),
  };
};

export const AccountsResponse = (accounts: Account[]): AccountDto[] => {
  return accounts.map((account) => AccountResponse(account));
};
