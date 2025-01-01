import {
    ArgumentMetadata,
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
    UseGuards,
} from '@nestjs/common';
import {
    ApiBearerAuth,
    ApiConflictResponse,
    ApiCreatedResponse,
    ApiExtraModels,
    ApiNoContentResponse,
    ApiNotFoundResponse,
    ApiOkResponse,
    ApiOperation,
    ApiTags,
    getSchemaPath,
} from '@nestjs/swagger';
import { User } from 'src/common/decorators/user.decorator';
import {
    CreateInvoiceDto,
    ReplaceInvoiceDto,
} from 'src/modules/invoices/dtos/invoice-request.dtos';
import {
    CreateOneInvoiceResponseDto,
    FindManyInvoiceResponseDto,
    FindOneInvoiceResponseDto,
} from 'src/modules/invoices/dtos/invoice-response.dtos';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { InvoicesService } from 'src/modules/invoices/invoices.service';
import { ApiCommonResponses } from 'src/common/decorators/api-common-responses.decorator';
import { ErrorResponseDto } from 'src/common/dtos/error-response.dto';
import { isOrderType } from 'src/common/constants/invoice.constants';

class InvoicePipeTransform implements PipeTransform {
    transform(
        value: CreateInvoiceDto | ReplaceInvoiceDto,
        metadata: ArgumentMetadata,
    ) {
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

@ApiBearerAuth()
@ApiTags('Invoices')
@UseGuards(AuthGuard)
@Controller('invoices')
@ApiExtraModels(
    CreateOneInvoiceResponseDto,
    FindOneInvoiceResponseDto,
    FindManyInvoiceResponseDto,
)
export class InvoicesController {
    constructor(private invoicesService: InvoicesService) {}

    @Get()
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ operationId: 'find invoices' })
    @ApiCommonResponses()
    @ApiOkResponse({
        description: 'Returns all invoices.',
        schema: {
            properties: {
                data: {
                    type: 'array',
                    items: {
                        $ref: getSchemaPath(FindManyInvoiceResponseDto),
                    },
                },
                meta: { type: 'object' },
            },
            required: ['data', 'meta'],
        },
    })
    async findAll(@User('id') userId: number) {
        const data = await this.invoicesService.findMany({
            where: { user: { id: userId } },
            relations: { order: true },
            select: {
                order: { id: true },
            },
            loadRelationIds: {
                relations: ['partner'],
                disableMixedMap: true,
            },
        });
        return { data };
    }

    @Get(':id')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ operationId: 'find an invoice' })
    @ApiCommonResponses()
    @ApiOkResponse({
        description: 'Returns the invoice with the given id.',
        schema: {
            properties: {
                data: {
                    $ref: getSchemaPath(FindOneInvoiceResponseDto),
                },
            },
            required: ['data'],
        },
    })
    @ApiNotFoundResponse({
        description: 'Invoice not found.',
        type: ErrorResponseDto,
    })
    async findById(
        @Param('id', new ParseIntPipe()) id: number,
        @User('id') userId: number,
    ) {
        const data = await this.invoicesService.findOne({
            where: { id, user: { id: userId } },
            relations: {
                partner: true,
                invoiceItems: { product: true, orderItem: true },
                order: { invoiceItems: { product: true } },
                refund: { invoiceItems: { product: true } },
            },
            select: {
                invoiceItems: {
                    id: true,
                    price: true,
                    quantity: true,
                    originalAmount: true,
                    discount: true,
                    amount: true,
                    remark: true,
                    weight: true,
                    delivered: true,
                    orderItem: { id: true },
                },
            },
            order: { invoiceItems: { id: 'ASC' } },
        });
        return { data };
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @ApiOperation({ operationId: 'create an invoice' })
    @ApiCommonResponses()
    @ApiCreatedResponse({
        description: 'Returns the created invoice.',
        schema: {
            properties: {
                data: {
                    $ref: getSchemaPath(CreateOneInvoiceResponseDto),
                },
            },
            required: ['data'],
        },
    })
    @ApiConflictResponse({
        description: 'Invoice already exists.',
        type: ErrorResponseDto,
    })
    @ApiNotFoundResponse({
        description: 'Partner, product, order or order item not found.',
        type: ErrorResponseDto,
    })
    async createOne(
        @Body(new InvoicePipeTransform()) dto: CreateInvoiceDto,
        @User('id') userId: number,
    ) {
        const data = await this.invoicesService.createOne({
            ...dto,
            user: { id: userId },
        });
        return { data };
    }

    @Put(':id')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ operationId: 'replace an invoice' })
    @ApiCommonResponses()
    @ApiOkResponse({
        description: 'Returns the replaced invoice.',
        schema: {
            properties: {
                data: {
                    $ref: getSchemaPath(CreateOneInvoiceResponseDto),
                },
            },
            required: ['data'],
        },
    })
    @ApiConflictResponse({
        description: 'Invoice already exists.',
        type: ErrorResponseDto,
    })
    @ApiNotFoundResponse({
        description: 'Partner, product, invoice or order item not found.',
        type: ErrorResponseDto,
    })
    async updateById(
        @Param('id', new ParseIntPipe()) id: number,
        @Body() dto: ReplaceInvoiceDto,
        @User('id') userId: number,
    ) {
        const data = await this.invoicesService.replaceOne(
            { where: { id, user: { id: userId } } },
            { ...dto, user: { id: userId } },
        );
        return { data };
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
        type: ErrorResponseDto,
    })
    deleteById(
        @Param('id', new ParseIntPipe()) id: number,
        @User('id') userId: number,
    ) {
        return this.invoicesService.deleteMany({ id, user: { id: userId } });
    }
}
