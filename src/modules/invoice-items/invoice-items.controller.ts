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
import { AuthGuard } from 'src/common/guards/auth.guard';
import { InvoiceItemsService } from 'src/modules/invoice-items/invoice-items.service';
import { User } from 'src/common/decorators/user.decorator';
import {
    ApiCreatedResponse,
    ApiExtraModels,
    ApiNoContentResponse,
    ApiNotFoundResponse,
    ApiOkResponse,
    ApiOperation,
    ApiTags,
    getSchemaPath,
} from '@nestjs/swagger';
import {
    CreateInvoiceItemDto,
    UpdateInvoiceItemDto,
} from 'src/modules/invoice-items/dtos/invoice-item-request.dtos';
import { BaseInvoiceItemDto } from 'src/modules/invoice-items/dtos/base-invoice-item.dto';
import {
    FindOneInvoiceItemResponseDto,
    FindManyInvoiceItemResponseDto,
} from 'src/modules/invoice-items/dtos/invoice-item-response.dtos';
import { ApiCommonResponses } from 'src/common/decorators/api-common-responses.decorator';
import { ErrorResponseDto } from 'src/common/dtos/error-response.dto';

@ApiTags('InvoiceItems')
@Controller('invoiceItems')
@UseGuards(AuthGuard)
@ApiExtraModels(
    BaseInvoiceItemDto,
    FindOneInvoiceItemResponseDto,
    FindManyInvoiceItemResponseDto,
)
export class InvoiceItemsController {
    constructor(private invoiceItemsService: InvoiceItemsService) {}

    @Get()
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ operationId: 'find invoice items' })
    @ApiCommonResponses()
    @ApiOkResponse({
        description: 'Returns all invoice items.',
        schema: {
            properties: {
                data: {
                    type: 'array',
                    items: {
                        $ref: getSchemaPath(FindManyInvoiceItemResponseDto),
                    },
                },
                meta: { type: 'object' },
            },
            required: ['data', 'meta'],
        },
    })
    async findAll(@User('id') userId: number) {
        const data = await this.invoiceItemsService.findMany({
            where: { user: { id: userId } },
            relations: ['orderItem'],
            select: {
                orderItem: { id: true },
            },
            loadRelationIds: {
                relations: ['product', 'invoice'],
                disableMixedMap: true,
            },
        });
        return { data };
    }

    @Get(':id')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ operationId: 'find an invoice item' })
    @ApiCommonResponses()
    @ApiOkResponse({
        description: 'Returns the invoice item with the given id.',
        schema: {
            properties: {
                data: {
                    $ref: getSchemaPath(FindOneInvoiceItemResponseDto),
                },
            },
            required: ['data'],
        },
    })
    @ApiNotFoundResponse({
        description: 'Invoice item not found.',
        type: ErrorResponseDto,
    })
    async findById(
        @Param('id', new ParseIntPipe()) id: number,
        @User('id') userId: number,
    ) {
        const data = await this.invoiceItemsService.findOne({
            where: { id, user: { id: userId } },
        });
        return { data };
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @ApiOperation({ operationId: 'create an invoice item' })
    @ApiCommonResponses()
    @ApiCreatedResponse({
        description: 'Returns the created invoice item.',
        schema: {
            properties: {
                data: { $ref: getSchemaPath(BaseInvoiceItemDto) },
            },
            required: ['data'],
        },
    })
    @ApiNotFoundResponse({
        description: 'Product not found.',
        type: ErrorResponseDto,
    })
    async createOne(
        @Body() dto: CreateInvoiceItemDto,
        @User('id') userId: number,
    ) {
        const data = await this.invoiceItemsService.createOne({
            ...dto,
            user: { id: userId },
        });
        return { data };
    }

    @Patch(':id')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ operationId: 'update an invoice item' })
    @ApiCommonResponses()
    @ApiOkResponse({
        description: 'Returns the updated invoice item.',
        schema: {
            properties: {
                data: { $ref: getSchemaPath(BaseInvoiceItemDto) },
            },
            required: ['data'],
        },
    })
    @ApiNotFoundResponse({
        description: 'Invoice item or product not found.',
        type: ErrorResponseDto,
    })
    async updateById(
        @Param('id', new ParseIntPipe()) id: number,
        @Body() dto: UpdateInvoiceItemDto,
    ) {
        const data = await this.invoiceItemsService.updateOne(
            { where: { id } },
            dto,
        );
        return { data };
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    @ApiCommonResponses()
    @ApiOperation({ operationId: 'delete an invoice item' })
    @ApiNoContentResponse({
        description: 'Invoice item deleted successfully.',
        content: { 'text/plain': {} },
    })
    @ApiNotFoundResponse({
        description: 'Invoice item not found.',
        type: ErrorResponseDto,
    })
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
