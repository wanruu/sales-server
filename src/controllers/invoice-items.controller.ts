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
import { ApiExtraModels, ApiTags } from '@nestjs/swagger';
import {
    CreateOneInvoiceItemApiResponses,
    DeleteOneInvoiceItemApiResponses,
    FindManyInvoiceItemApiResponses,
    FindOneInvoiceItemApiResponse,
    UpdateOneInvoiceItemApiResponses,
} from 'src/decorators/api-response/invoice-item.api-response.decorator';
import { FindManyInvoiceItemResponseDto } from 'src/dtos/response/invoice-item/find-many-invoice-item.response.dto';
import { CreateInvoiceItemDto } from 'src/dtos/request/invoice-item/create-invoice-item.dto';
import { UpdateInvoiceItemDto } from 'src/dtos/request/invoice-item/update-invoice-item.dto';
import { BaseInvoiceItemDto } from 'src/dtos/common/base-invoice-item.dto';
import { FindOneInvoiceItemResponseDto } from 'src/dtos/response/invoice-item/find-one-invoice-item.response.dto';

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
    @FindManyInvoiceItemApiResponses()
    async findAll(@User('id') userId: number) {
        const data = await this.invoiceItemsService.findMany({
            where: { user: { id: userId } },
            loadRelationIds: {
                relations: ['product', 'invoice', 'orderItem'],
                disableMixedMap: true,
            },
        });
        return { data };
    }

    @Get(':id')
    @HttpCode(HttpStatus.OK)
    @FindOneInvoiceItemApiResponse()
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
    @CreateOneInvoiceItemApiResponses()
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
    @UpdateOneInvoiceItemApiResponses()
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
