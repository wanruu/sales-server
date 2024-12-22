import { ApiProperty } from '@nestjs/swagger';
import { BaseInvoiceItemDto } from 'src/dtos/common/base-invoice-item.dto';
import { BaseInvoiceDto } from 'src/dtos/common/base-invoice.dto';
import { BaseProductDto } from 'src/dtos/common/base-product.dto';
import { NullableIdDto } from 'src/dtos/common/id.dto';

export class FindOneInvoiceItemDto extends BaseInvoiceItemDto {
    @ApiProperty({ type: BaseProductDto })
    product: BaseProductDto;

    @ApiProperty({ type: BaseInvoiceDto })
    invoice: BaseInvoiceDto;

    @ApiProperty({ type: NullableIdDto })
    orderItem: NullableIdDto;
}
