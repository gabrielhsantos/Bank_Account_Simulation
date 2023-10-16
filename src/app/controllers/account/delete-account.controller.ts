import {
  Controller,
  Delete,
  HttpStatus,
  HttpCode,
  Param,
} from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { InternalServerErrorException } from '@shared/exceptions/internal-server-error.exception';
import { IRequestHandler } from '@core/domain/interfaces/request-handler.interface';
import { NotFoundException } from '@shared/exceptions';
import { DeleteAccountService } from '@services/account/delete-account.service';

@ApiTags('accounts')
@Controller('accounts/:id')
export class DeleteAccountController implements IRequestHandler<Promise<void>> {
  constructor(private readonly accountService: DeleteAccountService) {}

  @Delete()
  @HttpCode(204)
  @ApiOperation({ summary: 'Inserção de livros no carrinho de compras.' })
  @ApiParam({
    name: 'id',
    type: 'number',
    description: 'account identifier',
  })
  @ApiResponse({
    status: 204,
    description: 'Carrinho de compras criado com sucesso.',
  })
  @ApiResponse({
    status: 400,
    description: 'Carrinho de compras criado com sucesso.',
  })
  async handle(@Param() params: { id: string }): Promise<void> {
    try {
      await this.accountService.delete(Number(params.id));
    } catch (error) {
      switch (error.status) {
        case HttpStatus.NOT_FOUND:
          throw new NotFoundException(error.message);
        default:
          throw new InternalServerErrorException(error.message);
      }
    }
  }
}
