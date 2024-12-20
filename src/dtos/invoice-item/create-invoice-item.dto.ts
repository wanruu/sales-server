import {
    Min,
    Max,
    IsInt,
    IsDecimal,
    IsOptional,
    IsString,
    IsBoolean,
    IsUUID,
} from 'class-validator';

export class BaseCreateInvoiceItemDto {}
export class CreateInvoiceItemDto {
    @IsUUID()
    productId: string;

    @IsDecimal()
    @Min(0)
    price: number;

    @IsDecimal()
    @Min(0)
    quantity: number;

    @IsDecimal()
    @Min(0)
    originalAmount: number;

    @IsInt()
    @Min(0)
    @Max(100)
    discount: number;

    @IsDecimal()
    @Min(0)
    amount: number;

    @IsDecimal()
    @Min(0)
    @IsOptional()
    weight?: number;

    @IsString()
    @IsOptional()
    remark?: string;

    @IsBoolean()
    delivered: boolean;

    @IsUUID()
    @IsOptional()
    invoiceId?: string;
}
