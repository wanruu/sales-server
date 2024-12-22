import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    ParseIntPipe,
    Patch,
    Post,
    UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'src/guards/auth.guard';
import { InvoiceItemsService } from 'src/services/invoice-items.service';
import { User } from 'src/decorators/user.decorator';
import { ApiTags } from '@nestjs/swagger';
import {
    CreateOneInvoiceItemApiResponses,
    DeleteOneInvoiceItemApiResponses,
    FindManyInvoiceItemApiResponses,
    UpdateOneInvoiceItemApiResponses,
} from 'src/decorators/api-response/invoice-item.api-response.decorator';
import { FindManyInvoiceItemDto } from 'src/dtos/response/invoice-item/find-many-invoice-item.response.dto';
import { CreateInvoiceItemDto } from 'src/dtos/request/invoice-item/create-invoice-item.dto';
import { UpdateInvoiceItemDto } from 'src/dtos/request/invoice-item/update-invoice-item.dto';

@ApiTags('InvoiceItems')
@Controller('invoiceItems')
@UseGuards(AuthGuard)
export class InvoiceItemsController {
    constructor(private invoiceItemsService: InvoiceItemsService) {}

    @Get()
    @HttpCode(HttpStatus.OK)
    @FindManyInvoiceItemApiResponses()
    findAll(@User('id') userId: number): Promise<FindManyInvoiceItemDto[]> {
        return this.invoiceItemsService.findMany({
            where: { user: { id: userId } },
            loadRelationIds: {
                relations: ['product', 'invoice', 'orderItem'],
                disableMixedMap: true,
            },
        });
    }

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
