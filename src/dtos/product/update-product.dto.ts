import { PartialType } from '@nestjs/swagger';
import {
    CreateProductDto,
    CreateOneProductResponseDto,
} from './create-product.dto';

export class UpdateProductDto extends PartialType(CreateProductDto) {}
export class UpdateOneProductResponseDto extends CreateOneProductResponseDto {}
