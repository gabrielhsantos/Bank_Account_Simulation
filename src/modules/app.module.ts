import { Module } from '@nestjs/common';
import { ConfigModule } from '@modules/env/config.module';
import { DatabaseModule } from '@modules/database/database.module';
// import { MiddlwareModule } from './middleware/middleware.module';
import { AccountModule } from './entities/account.module';
import { TransactionModule } from './entities/transaction.module';

@Module({
  imports: [ConfigModule, DatabaseModule, AccountModule, TransactionModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
