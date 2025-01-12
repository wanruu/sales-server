import {
    BadRequestException,
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    ParseIntPipe,
    PipeTransform,
    Post,
    Put,
    Query,
    UseGuards,
} from '@nestjs/common';
import {
    ApiConflictResponse,
    ApiCreatedResponse,
    ApiNoContentResponse,
    ApiNotFoundResponse,
    ApiOkResponse,
    ApiOperation,
    ApiTags,
} from '@nestjs/swagger';
import { User } from 'src/common/decorators/user.decorator';
import {
    CreateInvoiceDto,
    InvoiceFilterOptionsDto,
    ReplaceInvoiceDto,
} from 'src/modules/invoices/dtos/invoice-request.dtos';
import {
    FindManyInvoiceResponseDto,
    FindOneInvoiceResponseDto,
} from 'src/modules/invoices/dtos/invoice-response.dtos';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { InvoicesService } from 'src/modules/invoices/invoices.service';
import { ApiCommonResponses } from 'src/common/decorators/api-common-responses.decorator';
import { ErrorDto } from 'src/common/dtos/error.dto';
import { isOrderType } from 'src/common/constants/invoice.constants';
import { PageOptionsDto } from 'src/common/dtos/page-options.dto';
import { ApiPaginatedResponse } from 'src/common/decorators/api-paginated-response.decorator';
import { BaseInvoiceDto } from './dtos/base-invoice.dto';

class InvoicePipeTransform implements PipeTransform {
    transform(value: CreateInvoiceDto | ReplaceInvoiceDto) {
        const messages: string[] = [];
        if (isOrderType(value.type)) {
            if (value.order) {
                value.order.id = null;
            }
            value.invoiceItems.forEach((item) => {
                if (item.orderItem) {
                    item.orderItem.id = null;
                }
            });
        } else {
            if (!value.order.id) {
                messages.push('order.id is required');
            }
            if (!('id' in value.partner)) {
                messages.push('partner.id is required');
            }
            value.invoiceItems.forEach((item, index) => {
                if (!item.orderItem?.id) {
                    messages.push(
                        `invoiceItems.${index}.orderItem.id is required`,
                    );
                }
                if (!('id' in item.product)) {
                    messages.push(
                        `invoiceItems.${index}.product.id is required`,
                    );
                }
            });
        }
        if (messages.length > 0) {
            throw new BadRequestException(messages);
        }
        return value;
    }
}

@ApiTags('Invoices')
@UseGuards(AuthGuard)
@Controller('invoices')
export class InvoicesController {
    constructor(private invoicesService: InvoicesService) {}

    @Get()
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ operationId: 'find invoices' })
    @ApiCommonResponses()
    @ApiPaginatedResponse(FindManyInvoiceResponseDto)
    findAll(
        @Query() pageOptionsDto: PageOptionsDto,
        @Query() filterOptionsDto: InvoiceFilterOptionsDto,
        @User('id') userId: number,
    ) {
        const where = { user: { id: userId } };
        if (filterOptionsDto.partnerId) {
            where['partner'] = { id: filterOptionsDto.partnerId };
        }
        if (filterOptionsDto.type !== undefined) {
            where['type'] = filterOptionsDto.type;
        }
        return this.invoicesService.findMany(where, pageOptionsDto);
    }

    @Get(':id')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ operationId: 'find an invoice' })
    @ApiCommonResponses()
    @ApiOkResponse({
        description: 'Returns the invoice with the given id.',
        type: FindOneInvoiceResponseDto,
    })
    @ApiNotFoundResponse({
        description: 'Invoice not found.',
        type: ErrorDto,
    })
    findById(
        @Param('id', new ParseIntPipe()) id: number,
        @User('id') userId: number,
    ) {
        return this.invoicesService.findOne({ id, user: { id: userId } });
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @ApiOperation({ operationId: 'create an invoice' })
    @ApiCommonResponses()
    @ApiCreatedResponse({
        description: 'Returns the created invoice.',
        type: BaseInvoiceDto,
    })
    @ApiConflictResponse({
        description: 'Invoice already exists.',
        type: ErrorDto,
    })
    @ApiNotFoundResponse({
        description: 'Partner, product, order or order item not found.',
        type: ErrorDto,
    })
    createOne(
        @Body(new InvoicePipeTransform()) dto: CreateInvoiceDto,
        @User('id') userId: number,
    ) {
        return this.invoicesService.createOne({ ...dto, user: { id: userId } });
    }

    @Put(':id')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ operationId: 'replace an invoice' })
    @ApiCommonResponses()
    @ApiOkResponse({
        description: 'Returns the replaced invoice.',
        type: BaseInvoiceDto,
    })
    @ApiConflictResponse({
        description: 'Invoice already exists.',
        type: ErrorDto,
    })
    @ApiNotFoundResponse({
        description: 'Partner, product, invoice or order item not found.',
        type: ErrorDto,
    })
    updateById(
        @Param('id', new ParseIntPipe()) id: number,
        @Body() dto: ReplaceInvoiceDto,
        @User('id') userId: number,
    ) {
        return this.invoicesService.replaceOne(
            { id, user: { id: userId } },
            { ...dto, user: { id: userId } },
        );
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    @ApiOperation({ operationId: 'delete an invoice' })
    @ApiCommonResponses()
    @ApiNoContentResponse({
        description: 'Invoice deleted successfully.',
        content: { 'text/plain': {} },
    })
    @ApiNotFoundResponse({
        description: 'Invoice not found.',
        type: ErrorDto,
    })
    deleteById(
        @Param('id', new ParseIntPipe()) id: number,
        @User('id') userId: number,
    ) {
        return this.invoicesService.deleteMany({ id, user: { id: userId } });
    }
}
