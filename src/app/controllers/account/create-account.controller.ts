import {
  Controller,
  Post,
  Body,
  HttpStatus,
  HttpCode,
  ValidationPipe,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { InternalServerErrorException } from '@shared/exceptions/internal-server-error.exception';
import { IRequestHandler } from '@core/domain/interfaces/request-handler.interface';
import { BadRequestException, NotFoundException } from '@shared/exceptions';
import { UnprocessableEntityException } from '@shared/exceptions/unprocessable-entity.exception';
import { CreateAccountService } from '@services/account/create-account.service';
import { AccountBodyDto, AccountDto } from '@core/domain/dtos/account.dto';
import { AccountResponse } from '@app/presenters/account.mapper';

type handleResponse =
  | AccountDto
  | NotFoundException
  | UnprocessableEntityException
  | InternalServerErrorException;

@ApiTags('accounts')
@Controller('accounts')
export class CreateAccountController
  implements IRequestHandler<Promise<handleResponse>>
{
  constructor(private readonly accountService: CreateAccountService) {}

  @Post()
  @HttpCode(201)
  @ApiOperation({ summary: 'Inserção de livros no carrinho de compras.' })
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
    @Body(ValidationPipe) accountBodyDto: AccountBodyDto,
  ): Promise<handleResponse> {
    try {
      const newAccount = await this.accountService.create(accountBodyDto);

      return AccountResponse(newAccount);
    } catch (error) {
      switch (error.status) {
        case HttpStatus.NOT_FOUND:
          throw new NotFoundException(error.message);
        case HttpStatus.BAD_REQUEST:
          throw new BadRequestException(error.message);
        case HttpStatus.UNPROCESSABLE_ENTITY:
          throw new UnprocessableEntityException(error.message);
        default:
          throw new InternalServerErrorException(error.message);
      }
    }
  }
}
