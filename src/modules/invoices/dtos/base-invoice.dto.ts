import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsString, Length } from 'class-validator';
import {
    DeliveryStatus,
    InvoiceType,
} from 'src/common/constants/invoice.constants';

export class BaseInvoiceDto {
    @ApiProperty({
        example: 1,
        description: 'Unique identifier of the invoice.',
    })
    @IsNumber()
    id: number;

    @ApiProperty({
        example: '200012120001',
        description:
            'The number of the invoice, unique for each user and invoice type.',
    })
    @IsString()
    @Length(12, 12)
    number: string;

    @ApiProperty({
        enum: InvoiceType,
        example: InvoiceType.SalesOrder,
        description: 'The type of the invoice.',
    })
    @IsEnum(InvoiceType)
    type: InvoiceType;

    @ApiProperty({
        example: 1000,
        description: 'The total amount of the invoice.',
    })
    @IsNumber()
    amount: number;

    @ApiProperty({
        example: 50,
        description: 'The prepayment amount of the invoice.',
    })
    @IsNumber()
    prepayment: number;

    @ApiProperty({
        example: 200,
        description: 'The payment amount of the invoice.',
    })
    @IsNumber()
    payment: number;

    @ApiProperty({ enum: DeliveryStatus, example: DeliveryStatus.Delivered })
    @IsEnum(DeliveryStatus)
    delivered: DeliveryStatus;
}
