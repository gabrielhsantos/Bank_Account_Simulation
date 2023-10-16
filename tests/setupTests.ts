import 'reflect-metadata';
import { Injectable } from '@nestjs/common';
import { CreateAccountService } from '@services/account/create-account.service';
import { AccountTypeEnum } from '@core/domain/enums/account.enum';
import { Account } from '@core/infrastructure/entities/account.entity';

@Injectable()
export class TestSetupService {
  constructor(private readonly createAccountService: CreateAccountService) {}

  async setupAccount(): Promise<Account> {
    return await this.createAccountService.create({
      type: AccountTypeEnum.CHECKING,
    });
  }
}
