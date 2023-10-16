import { Optional } from 'sequelize';
import {
  Model,
  Column,
  Table,
  PrimaryKey,
  AutoIncrement,
  DataType,
  ForeignKey,
  AllowNull,
} from 'sequelize-typescript';
import { Account } from './account.entity';
import { TransactionTypeEnum } from '@core/domain/enums/transaction.enum';
import { TransactionDto } from '@core/domain/dtos/transaction.dto';

interface TransactionDtoOptionalAttributes
  extends Optional<TransactionDto, 'id'> {}

@Table({
  tableName: 'transactions',
  timestamps: true,
})
export class Transaction extends Model<
  TransactionDto,
  TransactionDtoOptionalAttributes
> {
  @PrimaryKey
  @AutoIncrement
  @Column
  public id: number;

  @ForeignKey(() => Account)
  @Column
  public accountId: number;

  @Column
  public type: TransactionTypeEnum;

  @Column({
    type: DataType.FLOAT,
  })
  public amount: number;

  @AllowNull
  @Column
  public description?: string;
}
