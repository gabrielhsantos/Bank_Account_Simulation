import { AccountTypeEnum } from '@core/domain/enums/account.enum';
import { Optional } from 'sequelize';
import {
  Model,
  Column,
  Table,
  PrimaryKey,
  AutoIncrement,
  DataType,
  HasMany,
} from 'sequelize-typescript';
import { Transaction } from './transaction.entity';
import { AccountDto } from '@core/domain/dtos/account.dto';

interface AccountDtoOptionalAttributes extends Optional<AccountDto, 'id'> {}

@Table({
  tableName: 'accounts',
  timestamps: false,
  indexes: [
    {
      name: 'unique_type_and_number',
      unique: true,
      fields: ['number', 'type'],
    },
  ],
})
export class Account extends Model<AccountDto, AccountDtoOptionalAttributes> {
  @PrimaryKey
  @AutoIncrement
  @Column
  public id: number;

  @Column
  public number: string;

  @Column
  public type: AccountTypeEnum;

  @Column({
    type: DataType.FLOAT,
  })
  public balance: number;

  @Column
  public active: boolean;

  @HasMany(() => Transaction)
  public transactions: Transaction[];
}
