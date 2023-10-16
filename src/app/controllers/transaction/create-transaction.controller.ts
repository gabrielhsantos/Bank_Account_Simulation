import {
  Controller,
  Post,
  Body,
  HttpStatus,
  Param,
  HttpCode,
  ValidationPipe,
} from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { InternalServerErrorException } from '@shared/exceptions/internal-server-error.exception';
import { IRequestHandler } from '@core/domain/interfaces/request-handler.interface';
import { NotFoundException } from '@shared/exceptions';
import { UnprocessableEntityException } from '@shared/exceptions/unprocessable-entity.exception';
import {
  TransactionBodyDto,
  TransactionDto,
} from '@core/domain/dtos/transaction.dto';
import { CreatetransactionService } from '@services/transaction/create-transaction.service';
import { TransactionResponse } from '@app/presenters/transaction.mapper';

type handleResponse =
  | TransactionDto
  | NotFoundException
  | UnprocessableEntityException
  | InternalServerErrorException;

@ApiTags('transactions')
@Controller('accounts/:id/transactions')
export class CreateTransactionController
  implements IRequestHandler<Promise<handleResponse>>
{
  constructor(private readonly transactionService: CreatetransactionService) {}

  @Post()
  @HttpCode(201)
  @ApiOperation({ summary: 'Inserção de livros no carrinho de compras.' })
  @ApiParam({
    name: 'id',
    type: 'number',
    description: 'account identifier',
  })
  @ApiResponse({
    status: 201,
    description: 'Carrinho de compras criado com sucesso.',
  })
  @ApiResponse({
    status: 400,
    description: 'Carrinho de compras criado com sucesso.',
  })
  @ApiResponse({
    status: 422,
    description: 'Carrinho de compras criado com sucesso.',
  })
  async handle(
    @Body(ValidationPipe) transactionBodyDto: TransactionBodyDto,
    @Param() params: { id: string },
  ): Promise<handleResponse> {
    try {
      const newTransaction = await this.transactionService.create(
        transactionBodyDto,
        Number(params.id),
      );

      return TransactionResponse(newTransaction);
    } catch (error) {
      switch (error.status) {
        case HttpStatus.NOT_FOUND:
          throw new NotFoundException(error.message);
        case HttpStatus.UNPROCESSABLE_ENTITY:
          throw new UnprocessableEntityException(error.message);
        default:
          throw new InternalServerErrorException(error.message);
      }
    }
  }
}
