import { ApiProperty } from '@nestjs/swagger';
import { BaseInvoiceItemDto } from 'src/dtos/common/base-invoice-item.dto';
import { BaseInvoiceDto } from 'src/dtos/common/base-invoice.dto';
import { BaseProductDto } from 'src/dtos/common/base-product.dto';

class _FindOneProductResponseInvoiceItemDto extends BaseInvoiceItemDto {
    @ApiProperty({ type: BaseInvoiceDto })
    invoice: BaseInvoiceDto;
}

export class FindOneProductResponseDto extends BaseProductDto {
    @ApiProperty({
        isArray: true,
        type: _FindOneProductResponseInvoiceItemDto,
        // allOf: [
        //     { $ref: getSchemaPath(BaseInvoiceItemDto) },
        //     {
        //         type: 'object',
        //         properties: {
        //             invoice: { $ref: getSchemaPath(BaseInvoiceDto) },
        //         },
        //     },
        // ],
    })
    invoiceItems: (BaseInvoiceItemDto & { invoice: BaseInvoiceDto })[];
}
