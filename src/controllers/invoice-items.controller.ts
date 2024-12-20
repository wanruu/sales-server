import {
    Body,
    Controller,
    Delete,
    HttpCode,
    HttpStatus,
    Param,
    Patch,
    Post,
    UseGuards,
} from '@nestjs/common';
import { CreateInvoiceItemDto } from 'src/dtos/invoice-item/create-invoice-item.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { UpdateInvoiceItemDto } from 'src/dtos/invoice-item/update-invoice-item.dto';
import { InvoiceItemsService } from 'src/services/invoice-items.service';
import { User } from 'src/decorators/user.decorator';

@Controller('invoiceItems')
@UseGuards(AuthGuard)
export class InvoiceItemsController {
    constructor(private invoiceItemsService: InvoiceItemsService) {}
    @Post()
    @HttpCode(HttpStatus.CREATED)
    create(@Body() dto: CreateInvoiceItemDto) {
        return this.invoiceItemsService.create(dto);
    }

    @Patch(':id')
    @HttpCode(HttpStatus.OK)
    update(@Param('id') id: string, @Body() dto: UpdateInvoiceItemDto) {
        return this.invoiceItemsService.update(id, dto);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    delete(@Param('id') id: string, @User('id') userId: string) {
        return this.invoiceItemsService.delete(id, userId);
    }
}
