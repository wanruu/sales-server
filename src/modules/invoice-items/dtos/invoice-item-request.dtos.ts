import {
    ApiPropertyOptional,
    IntersectionType,
    PartialType,
    PickType,
} from '@nestjs/swagger';
import { IsInt, IsOptional } from 'class-validator';
import { BaseInvoiceItemDto } from './base-invoice-item.dto';
import { Transform } from 'class-transformer';

export class CreateInvoiceItemDto extends IntersectionType(
    PartialType(PickType(BaseInvoiceItemDto, ['weight'] as const)),
    PickType(BaseInvoiceItemDto, ['quantity', 'remark', 'product'] as const),
) {}

export class UpdateInvoiceItemDto extends PartialType(CreateInvoiceItemDto) {}

export class InvoiceItemFilterOptionsDto {
    @ApiPropertyOptional()
    @IsOptional()
    @IsInt()
    @Transform(({ value }) => parseInt(value), { toClassOnly: true })
    productId?: number;
}
