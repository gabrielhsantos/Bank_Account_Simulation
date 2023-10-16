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
  @ApiOperation({ summary: 'Deleção de uma conta bancária.' })
  @ApiParam({
    name: 'id',
    type: 'number',
    description: 'Identificador da conta.',
  })
  @ApiResponse({
    status: 204,
    description: 'Conta deletada com sucesso.',
  })
  @ApiResponse({
    status: 404,
    description: 'Conta não localizada pelo identificador.',
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
