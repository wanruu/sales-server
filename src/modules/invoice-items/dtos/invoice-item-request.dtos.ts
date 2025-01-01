import {
    ApiProperty,
    IntersectionType,
    PartialType,
    PickType,
} from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsObject, ValidateNested } from 'class-validator';
import { IdDto } from 'src/common/dtos/id.dto';
import { BaseInvoiceItemDto } from './base-invoice-item.dto';

export class CreateInvoiceItemDto extends IntersectionType(
    PartialType(PickType(BaseInvoiceItemDto, ['weight'] as const)),
    PickType(BaseInvoiceItemDto, ['quantity', 'remark'] as const),
) {
    @ApiProperty({ type: IdDto, example: { id: 1 } })
    @IsObject()
    @ValidateNested()
    @Type(() => IdDto)
    product: IdDto;
}

export class UpdateInvoiceItemDto extends PartialType(CreateInvoiceItemDto) {}
