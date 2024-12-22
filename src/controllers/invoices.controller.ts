import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    ParseIntPipe,
    Post,
    Put,
    UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import {
    CreateOneInvoiceApiResponses,
    DeleteOneInvoiceApiResponses,
    FindManyInvoiceApiResponses,
    FindOneInvoiceApiResponses,
    ReplaceOneInvoiceApiResponses,
} from 'src/decorators/api-response/invoice.api-response.decorator';
import { User } from 'src/decorators/user.decorator';
import { CreateInvoiceDto } from 'src/dtos/request/invoice/create-invoice.dto';
import { ReplaceInvoiceDto } from 'src/dtos/request/invoice/replace-invoice.dto';
import { CreateOneInvoiceResponseDto } from 'src/dtos/response/invoice/create-one-invoice.response.dto';
import { FindManyInvoiceResponseDto } from 'src/dtos/response/invoice/find-many-invoice.response.dto';
import { FindOneInvoiceResponseDto } from 'src/dtos/response/invoice/find-one-invoice.response.dto';

import { AuthGuard } from 'src/guards/auth.guard';
import { InvoicesService } from 'src/services/invoices.service';

@ApiBearerAuth()
@ApiTags('Invoices')
@UseGuards(AuthGuard)
@Controller('invoices')
export class InvoicesController {
    constructor(private invoicesService: InvoicesService) {}

    @Get()
    @HttpCode(HttpStatus.OK)
    @FindManyInvoiceApiResponses()
    findAll(@User('id') userId: number): Promise<FindManyInvoiceResponseDto[]> {
        return this.invoicesService.findMany({
            where: { user: { id: userId } },
            loadRelationIds: {
                relations: ['partner', 'order'],
                disableMixedMap: true,
            },
        });
    }

    @Get(':id')
    @HttpCode(HttpStatus.OK)
    @FindOneInvoiceApiResponses()
    async findById(
        @Param('id', new ParseIntPipe()) id: number,
        @User('id') userId: number,
    ): Promise<FindOneInvoiceResponseDto> {
        const invoice = await this.invoicesService.findOne({
            where: { id, user: { id: userId } },
            loadRelationIds: {
                relations: ['order'],
                disableMixedMap: true,
            },
            relations: {
                partner: true,
                invoiceItems: { product: true, orderItem: true },
            },
        });

        // TODO: find a better way to handle this
        return {
            ...invoice,
            invoiceItems: invoice.invoiceItems.map((item) => ({
                ...item,
                orderItem: { id: item.orderItem?.id || null },
            })),
        };
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @CreateOneInvoiceApiResponses()
    createOne(
        @Body() dto: CreateInvoiceDto,
        @User('id') userId: number,
    ): Promise<CreateOneInvoiceResponseDto> {
        return this.invoicesService.createOne({ ...dto, user: { id: userId } });
    }

    @Put(':id')
    @HttpCode(HttpStatus.OK)
    @ReplaceOneInvoiceApiResponses()
    updateById(
        @Param('id', new ParseIntPipe()) id: number,
        @Body() dto: ReplaceInvoiceDto,
        @User('id') userId: number,
    ): Promise<CreateOneInvoiceResponseDto> {
        return this.invoicesService.replaceOne(
            { where: { id, user: { id: userId } } },
            { ...dto, user: { id: userId } },
        );
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    @DeleteOneInvoiceApiResponses()
    deleteById(
        @Param('id', new ParseIntPipe()) id: number,
        @User('id') userId: number,
    ): Promise<void> {
        return this.invoicesService.deleteMany({ id, user: { id: userId } });
    }
}
