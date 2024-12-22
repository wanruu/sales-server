import {
    Body,
    Controller,
    Delete,
    HttpCode,
    HttpStatus,
    Param,
    ParseIntPipe,
    Patch,
    Post,
    UseGuards,
} from '@nestjs/common';
import { CreateInvoiceItemDto } from 'src/dtos/invoice-item/create-invoice-item.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { UpdateInvoiceItemDto } from 'src/dtos/invoice-item/update-invoice-item.dto';
import { InvoiceItemsService } from 'src/services/invoice-items.service';
import { User } from 'src/decorators/user.decorator';
import { ApiTags } from '@nestjs/swagger';
import {
    CreateOneInvoiceItemApiResponses,
    DeleteOneInvoiceItemApiResponses,
    UpdateOneInvoiceItemApiResponses,
} from 'src/decorators/api-response/invoice-item.api-response.decorator';

@ApiTags('InvoiceItems')
@Controller('invoiceItems')
@UseGuards(AuthGuard)
export class InvoiceItemsController {
    constructor(private invoiceItemsService: InvoiceItemsService) {}
    @Post()
    @HttpCode(HttpStatus.CREATED)
    @CreateOneInvoiceItemApiResponses()
    createOne(@Body() dto: CreateInvoiceItemDto, @User('id') userId: number) {
        return this.invoiceItemsService.createOne({
            ...dto,
            user: { id: userId },
        });
    }

    @Patch(':id')
    @HttpCode(HttpStatus.OK)
    @UpdateOneInvoiceItemApiResponses()
    updateById(
        @Param('id', new ParseIntPipe()) id: number,
        @Body() dto: UpdateInvoiceItemDto,
    ) {
        return this.invoiceItemsService.updateOne({ where: { id } }, dto);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    @DeleteOneInvoiceItemApiResponses()
    deleteById(
        @Param('id', new ParseIntPipe()) id: number,
        @User('id') userId: number,
    ) {
        return this.invoiceItemsService.deleteMany({
            id,
            user: { id: userId },
        });
    }
}
