import { DocumentBuilder } from '@nestjs/swagger';

export const config = new DocumentBuilder()
  .setTitle('Bank Account Simulation')
  .setDescription('API Rest - NestJS')
  .setVersion('1.0')
  .build();
