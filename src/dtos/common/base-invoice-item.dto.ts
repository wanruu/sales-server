import { ApiProperty } from '@nestjs/swagger';
import { IdDto, NullableIdDto } from './id.dto';

export class BaseInvoiceItemDto {
    @ApiProperty()
    id: number;

    @ApiProperty()
    price: number;

    @ApiProperty()
    quantity: number;

    @ApiProperty()
    originalAmount: number;

    @ApiProperty()
    discount: number;

    @ApiProperty()
    amount: number;

    @ApiProperty({ nullable: true })
    weight: number | null;

    @ApiProperty()
    remark: string;

    @ApiProperty()
    delivered: boolean;
}

export class BaseInvoiceItemWithRelationsDto extends BaseInvoiceItemDto {
    @ApiProperty({ type: IdDto })
    product: IdDto;

    @ApiProperty({ type: NullableIdDto })
    invoice: NullableIdDto;

    @ApiProperty({ type: NullableIdDto })
    orderItem: NullableIdDto;
}
