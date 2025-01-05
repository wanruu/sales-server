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
    Query,
    UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { InvoiceItemsService } from 'src/modules/invoice-items/invoice-items.service';
import { User } from 'src/common/decorators/user.decorator';
import {
    ApiCreatedResponse,
    ApiNoContentResponse,
    ApiNotFoundResponse,
    ApiOkResponse,
    ApiOperation,
    ApiTags,
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
import { ErrorDto } from 'src/common/dtos/error.dto';
import { PageOptionsDto } from 'src/common/dtos/page-options.dto';
import { ApiPaginatedResponse } from 'src/common/decorators/api-paginated-response.decorator';

@ApiTags('InvoiceItems')
@Controller('invoiceItems')
@UseGuards(AuthGuard)
export class InvoiceItemsController {
    constructor(private invoiceItemsService: InvoiceItemsService) {}

    @Get()
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ operationId: 'find invoice items' })
    @ApiCommonResponses()
    @ApiPaginatedResponse(FindManyInvoiceItemResponseDto)
    findAll(
        @Query() pageOptionsDto: PageOptionsDto,
        @User('id') userId: number,
    ) {
        return this.invoiceItemsService.findMany(pageOptionsDto, {
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
    }

    @Get(':id')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ operationId: 'find an invoice item' })
    @ApiCommonResponses()
    @ApiOkResponse({
        description: 'Returns the invoice item with the given id.',
        type: FindOneInvoiceItemResponseDto,
    })
    @ApiNotFoundResponse({
        description: 'Invoice item not found.',
        type: ErrorDto,
    })
    findById(
        @Param('id', new ParseIntPipe()) id: number,
        @User('id') userId: number,
    ) {
        return this.invoiceItemsService.findOne({
            where: { id, user: { id: userId } },
        });
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @ApiOperation({ operationId: 'create an invoice item' })
    @ApiCommonResponses()
    @ApiCreatedResponse({
        description: 'Returns the created invoice item.',
        type: BaseInvoiceItemDto,
    })
    @ApiNotFoundResponse({
        description: 'Product not found.',
        type: ErrorDto,
    })
    createOne(@Body() dto: CreateInvoiceItemDto, @User('id') userId: number) {
        return this.invoiceItemsService.createOne({
            ...dto,
            user: { id: userId },
        });
    }

    @Patch(':id')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ operationId: 'update an invoice item' })
    @ApiCommonResponses()
    @ApiOkResponse({
        description: 'Returns the updated invoice item.',
        type: BaseInvoiceItemDto,
    })
    @ApiNotFoundResponse({
        description: 'Invoice item or product not found.',
        type: ErrorDto,
    })
    updateById(
        @Param('id', new ParseIntPipe()) id: number,
        @Body() dto: UpdateInvoiceItemDto,
    ) {
        return this.invoiceItemsService.updateOne({ where: { id } }, dto);
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
        type: ErrorDto,
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
