import { ApiProperty } from '@nestjs/swagger';
import { TransactionTypeEnum } from '../enums/transaction.enum';
import { IsEnum, IsNumber, IsOptional, Length } from '@nestjs/class-validator';

export class TransactionBodyDto {
  @IsEnum(TransactionTypeEnum)
  @ApiProperty({
    enum: TransactionTypeEnum,
    example: TransactionTypeEnum.TRANSFER,
  })
  type: TransactionTypeEnum;

  @IsNumber()
  @ApiProperty({ example: 30.0 })
  amount: number;

  @Length(7, 7)
  @IsOptional()
  @ApiProperty({ example: '12345-6', nullable: true })
  toAccount?: string;
}

export class TransactionDto {
  id?: number;
  accountId: number;
  description?: string;
  type: TransactionTypeEnum;
  amount: number;
}
