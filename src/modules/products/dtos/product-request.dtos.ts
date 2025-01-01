import { PickType, PartialType, IntersectionType } from '@nestjs/swagger';
import { BaseProductDto } from './base-product.dto';

export class CreateProductDto extends IntersectionType(
    PartialType(PickType(BaseProductDto, ['material', 'quantity'] as const)),
    PickType(BaseProductDto, ['name', 'spec', 'unit'] as const),
) {}

export class UpdateProductDto extends PartialType(CreateProductDto) {}
