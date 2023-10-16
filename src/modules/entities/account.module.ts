import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AccountFactory } from '@core/domain/factories/account.factory';
import { AccountRepository } from '@core/infrastructure/repositories/account.repository';
import { CreateAccountService } from '@services/account/create-account.service';
import { CreateAccountController } from '@app/controllers/account/create-account.controller';
import { Account } from '@core/infrastructure/entities/account.entity';
import { GetAccountController } from '@app/controllers/account/get-account.controller';
import { GetAccountService } from '@services/account/get-account.service';
import { Transaction } from '@core/infrastructure/entities/transaction.entity';
import { GetAccountListController } from '@app/controllers/account/get-account-list.controller';
import { GetAccountListService } from '@services/account/get-account-list.service';
import { DeleteAccountService } from '@services/account/delete-account.service';
import { DeleteAccountController } from '@app/controllers/account/delete-account.controller';

@Module({
  imports: [SequelizeModule.forFeature([Account, Transaction])],
  providers: [
    AccountFactory,
    AccountRepository,
    CreateAccountService,
    GetAccountService,
    GetAccountListService,
    DeleteAccountService,
  ],
  controllers: [
    CreateAccountController,
    GetAccountController,
    GetAccountListController,
    DeleteAccountController,
  ],
})
export class AccountModule {}
