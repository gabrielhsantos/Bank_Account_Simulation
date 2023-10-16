import { Controller, Get, HttpCode, HttpStatus, Param } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags, ApiParam } from '@nestjs/swagger';
import { InternalServerErrorException } from '@shared/exceptions/internal-server-error.exception';
import { IRequestHandler } from '@core/domain/interfaces/request-handler.interface';
import { NotFoundException } from '@shared/exceptions';
import { UnprocessableEntityException } from '@shared/exceptions/unprocessable-entity.exception';
import { AccountDto } from '@core/domain/dtos/account.dto';
import { AccountResponse } from '@app/presenters/account.mapper';
import { GetAccountService } from '@services/account/get-account.service';

type handleResponse =
  | AccountDto
  | NotFoundException
  | UnprocessableEntityException
  | InternalServerErrorException;

@ApiTags('accounts')
@Controller('accounts')
export class GetAccountController
  implements IRequestHandler<Promise<handleResponse>>
{
  constructor(private readonly accountService: GetAccountService) {}

  @Get(':id')
  @HttpCode(200)
  @ApiParam({
    name: 'id',
    type: 'number',
    description: 'Identificador da conta.',
  })
  @ApiOperation({ summary: 'Retorno de uma conta bancária pelo identificador' })
  @ApiResponse({
    status: 200,
    description: 'Listagem da conta com o histórico de transações.',
  })
  async handle(@Param() params: { id: string }): Promise<handleResponse> {
    try {
      const account = await this.accountService.findOne(Number(params.id));

      return AccountResponse(account);
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
