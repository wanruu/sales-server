import { ApiProperty } from '@nestjs/swagger';
import { IdDto } from 'src/common/dtos/id.dto';
import { BaseInvoiceItemDto } from './base-invoice-item.dto';
import { BaseProductDto } from 'src/modules/products/dtos/base-product.dto';

export class FindManyInvoiceItemResponseDto extends BaseInvoiceItemDto {
    @ApiProperty({ type: IdDto })
    product: IdDto;
}
export class FindOneInvoiceItemResponseDto extends BaseInvoiceItemDto {
    @ApiProperty({ type: BaseProductDto })
    product: BaseProductDto;
}
