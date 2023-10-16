import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { InternalServerErrorException } from '@shared/exceptions/internal-server-error.exception';
import { IRequestHandler } from '@core/domain/interfaces/request-handler.interface';
import { NotFoundException } from '@shared/exceptions';
import { UnprocessableEntityException } from '@shared/exceptions/unprocessable-entity.exception';
import { AccountDto } from '@core/domain/dtos/account.dto';
import { AccountsResponse } from '@app/presenters/account.mapper';
import { GetAccountListService } from '@services/account/get-account-list.service';

type handleResponse =
  | AccountDto[]
  | NotFoundException
  | UnprocessableEntityException
  | InternalServerErrorException;

@ApiTags('accounts')
@Controller('accounts')
export class GetAccountListController
  implements IRequestHandler<Promise<handleResponse>>
{
  constructor(private readonly accountService: GetAccountListService) {}

  @Get()
  @HttpCode(200)
  @ApiOperation({ summary: 'Inserção de livros no carrinho de compras.' })
  @ApiResponse({
    status: 200,
    description: 'Carrinho de compras criado com sucesso.',
  })
  async handle(): Promise<handleResponse> {
    try {
      const accounts = await this.accountService.findAll();

      return AccountsResponse(accounts);
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
