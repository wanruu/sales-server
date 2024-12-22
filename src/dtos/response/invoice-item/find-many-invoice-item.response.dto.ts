import { ApiProperty } from '@nestjs/swagger';
import { BaseInvoiceItemDto } from 'src/dtos/common/base-invoice-item.dto';
import { IdDto, NullableIdDto } from 'src/dtos/common/id.dto';

export class FindManyInvoiceItemDto extends BaseInvoiceItemDto {
    @ApiProperty({ type: IdDto })
    product: IdDto;

    @ApiProperty({ type: NullableIdDto })
    invoice: NullableIdDto;

    @ApiProperty({ type: NullableIdDto })
    orderItem: NullableIdDto;
}
