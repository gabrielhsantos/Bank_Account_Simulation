import { Module } from '@nestjs/common';
import { TestSetupService } from '../../../tests/setupTests';
import { SequelizeModule } from '@nestjs/sequelize';
import { Transaction } from '@core/infrastructure/entities/transaction.entity';
import { Account } from '@core/infrastructure/entities/account.entity';
import { CreateAccountService } from '@services/account/create-account.service';
import { AccountRepository } from '@core/infrastructure/repositories/account.repository';
import { AccountFactory } from '@core/domain/factories/account.factory';
import { GetAccountService } from '@services/account/get-account.service';
import { GetAccountListService } from '@services/account/get-account-list.service';
import { DeleteAccountService } from '@services/account/delete-account.service';
import { UpdateAccountService } from '@services/account/update-account.service';
import { CreatetransactionService } from '@services/transaction/create-transaction.service';
import { TransactionRepository } from '@core/infrastructure/repositories/transaction.repository';
import { TransactionFactory } from '@core/domain/factories/transaction.factory';

@Module({
  imports: [SequelizeModule.forFeature([Account, Transaction])],
  providers: [
    TestSetupService,

    CreateAccountService,
    GetAccountService,
    GetAccountListService,
    DeleteAccountService,
    UpdateAccountService,
    AccountRepository,
    AccountFactory,

    CreatetransactionService,
    TransactionRepository,
    TransactionFactory,
  ],
})
export class TestModule {}
