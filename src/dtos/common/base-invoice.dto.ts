import { ApiProperty } from '@nestjs/swagger';
import { DeliveryStatus, InvoiceType } from 'src/constants/invoice.constant';
import { IdDto, NullableIdDto } from './id.dto';

export class BaseInvoiceDto {
    @ApiProperty()
    id: number;

    @ApiProperty()
    number: string;

    @ApiProperty({ enum: InvoiceType })
    type: InvoiceType;

    @ApiProperty()
    amount: number;

    @ApiProperty()
    prepayment: number;

    @ApiProperty()
    payment: number;

    @ApiProperty({ enum: DeliveryStatus })
    delivered: DeliveryStatus;
}

export class BaseInvoiceWithRelationsDto extends BaseInvoiceDto {
    @ApiProperty({ type: IdDto })
    partner: IdDto;

    @ApiProperty({ type: NullableIdDto })
    order: NullableIdDto;
}
