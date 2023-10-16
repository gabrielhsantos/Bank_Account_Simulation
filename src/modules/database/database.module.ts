import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Account } from '@core/infrastructure/entities/account.entity';
import { Transaction } from '@core/infrastructure/entities/transaction.entity';

@Module({
  imports: [
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const databaseConfig = configService.get('db');

        return {
          dialect: databaseConfig.dialect,
          host: databaseConfig.host,
          port: databaseConfig.port,
          username: databaseConfig.username,
          password: databaseConfig.password,
          database: databaseConfig.database,
          storage: databaseConfig?.storage,
          autoLoadModels: true,
          synchronize: true,
          logging: false,
          models: [Account, Transaction],
        };
      },
    }),
  ],
})
export class DatabaseModule {}
