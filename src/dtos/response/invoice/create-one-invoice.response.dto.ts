import { ApiProperty, getSchemaPath } from '@nestjs/swagger';
import { BaseInvoiceDto } from 'src/dtos/common/base-invoice.dto';
import { IdDto, NullableIdDto } from 'src/dtos/common/id.dto';

export class CreateOneInvoiceResponseDto extends BaseInvoiceDto {
    @ApiProperty({
        type: 'array',
        items: {
            type: 'object',
            properties: {
                id: { type: 'number' },
                product: { $ref: getSchemaPath(IdDto) },
                orderItem: { $ref: getSchemaPath(NullableIdDto) },
            },
        },
    })
    invoiceItems: { id: number; product: IdDto; orderItem: NullableIdDto }[];

    @ApiProperty({ type: IdDto })
    partner: IdDto;

    @ApiProperty({ type: NullableIdDto })
    order: NullableIdDto;
}
