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
    InvoiceItemFilterOptionsDto,
    UpdateInvoiceItemDto,
} from 'src/modules/invoice-items/dtos/invoice-item-request.dtos';
import { BaseInvoiceItemDto } from 'src/modules/invoice-items/dtos/base-invoice-item.dto';
import { FindManyInvoiceItemResponseDto } from 'src/modules/invoice-items/dtos/invoice-item-response.dtos';
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
        @Query() filterOptionsDto: InvoiceItemFilterOptionsDto,
        @User('id') userId: number,
    ) {
        const where = { user: { id: userId } };
        if (filterOptionsDto.productId) {
            where['product'] = { id: filterOptionsDto.productId };
        }
        return this.invoiceItemsService.findMany(where, pageOptionsDto);
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
        return this.invoiceItemsService.updateOne({ id }, dto);
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
