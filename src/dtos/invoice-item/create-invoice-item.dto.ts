import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
    Min,
    Max,
    IsInt,
    IsDecimal,
    IsOptional,
    IsString,
    IsBoolean,
} from 'class-validator';

export class BaseCreateInvoiceItemDto {}
export class CreateInvoiceItemDto {
    @ApiProperty()
    @IsInt()
    productId: number;

    @ApiProperty()
    @IsDecimal()
    @Min(0)
    price: number;

    @ApiProperty()
    @IsDecimal()
    @Min(0)
    quantity: number;

    @ApiProperty()
    @IsDecimal()
    @Min(0)
    originalAmount: number;

    @ApiProperty()
    @IsInt()
    @Min(0)
    @Max(100)
    discount: number;

    @ApiProperty()
    @IsDecimal()
    @Min(0)
    amount: number;

    @ApiPropertyOptional()
    @IsDecimal()
    @Min(0)
    @IsOptional()
    weight?: number;

    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    remark?: string;

    @ApiProperty()
    @IsBoolean()
    delivered: boolean;

    @ApiPropertyOptional()
    @IsInt()
    @IsOptional()
    invoiceId?: number;
}
