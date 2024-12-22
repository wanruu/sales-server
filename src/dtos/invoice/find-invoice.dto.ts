import { ApiProperty } from '@nestjs/swagger';
import { InvoiceType } from 'src/constants/invoice.constant';
import { IdDto } from '../base/id.dto';

export class FindOneInvoiceResponseDto {
    @ApiProperty()
    id: number;

    @ApiProperty({ enum: InvoiceType })
    type: InvoiceType;

    @ApiProperty()
    partner: IdDto;

    @ApiProperty()
    amount: number;

    @ApiProperty()
    prepayment: number;

    @ApiProperty()
    payment: number;

    @ApiProperty()
    delivered: boolean;

    @ApiProperty({ nullable: true })
    order: IdDto | null;
}

export class FindManyInvoiceResponseDto {
    @ApiProperty()
    id: number;

    @ApiProperty({ enum: InvoiceType })
    type: InvoiceType;

    @ApiProperty()
    partner: IdDto;

    @ApiProperty()
    amount: number;

    @ApiProperty()
    prepayment: number;

    @ApiProperty()
    payment: number;

    @ApiProperty()
    delivered: boolean;

    @ApiProperty({ nullable: true })
    order: IdDto | null;
}
