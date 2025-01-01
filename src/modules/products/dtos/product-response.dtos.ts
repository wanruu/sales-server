import { ApiExtraModels, ApiProperty, getSchemaPath } from '@nestjs/swagger';
import { BaseInvoiceItemDto } from 'src/modules/invoice-items/dtos/base-invoice-item.dto';
import { BaseInvoiceDto } from 'src/modules/invoices/dtos/base-invoice.dto';
import { BaseProductDto } from './base-product.dto';

@ApiExtraModels(BaseInvoiceDto)
export class FindOneProductResponseDto extends BaseProductDto {
    @ApiProperty({
        isArray: true,
        allOf: [
            { $ref: getSchemaPath(BaseInvoiceItemDto) },
            {
                properties: {
                    invoice: { $ref: getSchemaPath(BaseInvoiceDto) },
                },
                required: ['invoice'],
            },
        ],
    })
    invoiceItems: (BaseInvoiceItemDto & { invoice: BaseInvoiceDto })[];
}

export class FindManyProductResponseDto extends BaseProductDto {}
