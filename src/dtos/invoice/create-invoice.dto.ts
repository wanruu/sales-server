import {
    IsArray,
    IsBoolean,
    IsDecimal,
    IsEnum,
    IsOptional,
    IsUUID,
    Min,
} from 'class-validator';
import { InvoiceType } from 'src/constants/invoice.constant';

export class CreateInvoiceDto {
    @IsEnum(InvoiceType)
    type: InvoiceType;

    @IsUUID()
    partnerId: string;

    @IsDecimal()
    @Min(0)
    amount: number;

    @IsDecimal()
    @Min(0)
    prepayment: number;

    @IsDecimal()
    @Min(0)
    payment: number;

    @IsBoolean()
    delivered: boolean;

    @IsArray()
    invoiceItems: []; // TODO: define invoice item interface

    @IsOptional()
    @IsUUID()
    orderId?: string;

    @IsUUID()
    userId: string;
}
