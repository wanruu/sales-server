import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
    IsArray,
    IsBoolean,
    IsDecimal,
    IsEnum,
    IsOptional,
    IsInt,
    Min,
} from 'class-validator';
import { InvoiceType } from 'src/constants/invoice.constant';

export class CreateInvoiceDto {
    @ApiProperty()
    @IsEnum(InvoiceType)
    type: InvoiceType;

    @ApiProperty()
    @IsInt()
    partnerId: number;

    @ApiProperty()
    @IsDecimal()
    @Min(0)
    amount: number;

    @ApiProperty()
    @IsDecimal()
    @Min(0)
    prepayment: number;

    @ApiProperty()
    @IsDecimal()
    @Min(0)
    payment: number;

    @ApiProperty()
    @IsBoolean()
    delivered: boolean;

    @ApiProperty()
    @IsArray()
    invoiceItems: []; // TODO: define invoice item interface

    @ApiPropertyOptional()
    @IsOptional()
    @IsInt()
    orderId?: number;

    @ApiProperty()
    @IsInt()
    userId: number;
}
