import { ApiProperty } from '@nestjs/swagger';
import { DeliveryStatus, InvoiceType } from 'src/constants/invoice.constant';

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
