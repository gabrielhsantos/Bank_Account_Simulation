import { IFindAllService } from '@core/domain/interfaces/service.interface';
import { Injectable } from '@nestjs/common';
import { Account } from '@core/infrastructure/entities/account.entity';
import { AccountRepository } from '@core/infrastructure/repositories/account.repository';

@Injectable()
export class GetAccountListService
  implements IFindAllService<number, Promise<Account[]>>
{
  constructor(private readonly accountRepository: AccountRepository) {}

  async findAll(): Promise<Account[]> {
    return await this.accountRepository.findAll();
  }
}
