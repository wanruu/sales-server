import { ApiProperty, getSchemaPath } from '@nestjs/swagger';
import { BaseInvoiceWithRelationsDto } from 'src/dtos/common/base-invoice.dto';
import { IdDto, NullableIdDto } from 'src/dtos/common/id.dto';

export class CreateOneInvoiceResponseDto extends BaseInvoiceWithRelationsDto {
    @ApiProperty({
        type: 'array',
        items: {
            type: 'object',
            properties: {
                id: { type: 'number' },
                product: { type: getSchemaPath(IdDto) },
                orderItem: { type: getSchemaPath(NullableIdDto) },
            },
        },
    })
    invoiceItems: { id: number; product: IdDto; orderItem: NullableIdDto }[];
}
