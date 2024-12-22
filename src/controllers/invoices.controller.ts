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
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import {
    CreateOneInvoiceApiResponses,
    DeleteOneInvoiceApiResponses,
    FindManyInvoiceApiResponses,
    FindOneInvoiceApiResponses,
    UpdateOneInvoiceApiResponses,
} from 'src/decorators/api-response/invoice.api-response.decorator';
import { User } from 'src/decorators/user.decorator';
import {
    CreateInvoiceDto,
    CreateOneInvoiceResponseDto,
} from 'src/dtos/invoice/create-invoice.dto';
import {
    FindManyInvoiceResponseDto,
    FindOneInvoiceResponseDto,
} from 'src/dtos/invoice/find-invoice.dto';
import {
    UpdateInvoiceDto,
    UpdateOneInvoiceResponseDto,
} from 'src/dtos/invoice/update-invoice.dto';
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
        });
    }

    @Get(':id')
    @HttpCode(HttpStatus.OK)
    @FindOneInvoiceApiResponses()
    findById(
        @Param('id', new ParseIntPipe()) id: number,
        @User('id') userId: number,
    ): Promise<FindOneInvoiceResponseDto> {
        return this.invoicesService.findOne({
            where: { id, user: { id: userId } },
        });
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

    @Patch(':id')
    @HttpCode(HttpStatus.OK)
    @UpdateOneInvoiceApiResponses()
    updateById(
        @Param('id', new ParseIntPipe()) id: number,
        @Body() dto: UpdateInvoiceDto,
        @User('id') userId: number,
    ): Promise<UpdateOneInvoiceResponseDto> {
        return this.invoicesService.updateOne(
            { where: { id, user: { id: userId } } },
            dto,
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
