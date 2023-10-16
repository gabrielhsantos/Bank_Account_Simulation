import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AccountFactory } from '@core/domain/factories/account.factory';
import { AccountRepository } from '@core/infrastructure/repositories/account.repository';
import { CreateAccountService } from '@services/account/create-account.service';
import { Account } from '@core/infrastructure/entities/account.entity';
import { Transaction } from '@core/infrastructure/entities/transaction.entity';
import { TransactionFactory } from '@core/domain/factories/transaction.factory';
import { TransactionRepository } from '@core/infrastructure/repositories/transaction.repository';
import { CreatetransactionService } from '@services/transaction/create-transaction.service';
import { CreateTransactionController } from '@app/controllers/transaction/create-transaction.controller';
import { UpdateAccountService } from '@services/account/update-account.service';
import { GetAccountService } from '@services/account/get-account.service';

@Module({
  imports: [SequelizeModule.forFeature([Account, Transaction])],
  providers: [
    AccountFactory,
    AccountRepository,
    CreateAccountService,
    UpdateAccountService,
    GetAccountService,
    TransactionFactory,
    TransactionRepository,
    CreatetransactionService,
  ],
  controllers: [CreateTransactionController],
})
export class TransactionModule {}
