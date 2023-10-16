import { ApiProperty } from '@nestjs/swagger';
import { AccountTypeEnum } from '../enums/account.enum';
import { TransactionTypeEnum } from '../enums/transaction.enum';
import { IsEnum } from '@nestjs/class-validator';

export class AccountBodyDto {
  @IsEnum(AccountTypeEnum)
  @ApiProperty({
    enum: AccountTypeEnum,
    example: AccountTypeEnum.CHECKING,
  })
  type: AccountTypeEnum;
}

export class AccountDto {
  id?: number;
  number: string;
  type: AccountTypeEnum;
  balance: number;
  active: boolean;
  transactions?: {
    type: TransactionTypeEnum;
    amount: number;
    description?: string;
    date: Date;
  }[];
}
