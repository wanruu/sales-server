import { ApiExtraModels, ApiProperty } from '@nestjs/swagger';
import { BaseInvoiceItemDto } from 'src/dtos/common/base-invoice-item.dto';
import { BaseInvoiceDto } from 'src/dtos/common/base-invoice.dto';
import { BasePartnerDto } from 'src/dtos/common/base-partner.dto';
import { BaseProductDto } from 'src/dtos/common/base-product.dto';
import { NullableIdDto } from 'src/dtos/common/id.dto';

class _FindOneInvoiceResponseInvoiceItemDto extends BaseInvoiceItemDto {
    @ApiProperty({ type: BaseProductDto })
    product: BaseProductDto;

    @ApiProperty({ type: NullableIdDto })
    orderItem: NullableIdDto;
}

export class FindOneInvoiceResponseDto extends BaseInvoiceDto {
    @ApiExtraModels(BaseInvoiceItemDto)
    @ApiProperty({
        isArray: true,
        type: _FindOneInvoiceResponseInvoiceItemDto,
        // allOf: [
        //     {
        //         type: 'object',
        //         properties: {
        //             product: { $ref: getSchemaPath(BaseProductDto) },
        //             orderItem: { $ref: getSchemaPath(NullableIdDto) },
        //         },
        //     },
        //     { $ref: getSchemaPath(BaseInvoiceItemDto) },
        // ],
    })
    invoiceItems: (BaseInvoiceItemDto & {
        product: BaseProductDto;
        orderItem: NullableIdDto;
    })[];

    @ApiProperty({ type: BasePartnerDto })
    partner: BasePartnerDto;

    @ApiProperty({ type: NullableIdDto })
    order: NullableIdDto;
}
