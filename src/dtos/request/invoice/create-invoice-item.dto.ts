import {
    ApiProperty,
    ApiPropertyOptional,
    getSchemaPath,
} from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
    Min,
    Max,
    IsInt,
    IsOptional,
    IsString,
    IsBoolean,
    IsNumber,
    IsObject,
    ValidateNested,
    ValidateIf,
} from 'class-validator';
import { IdDto } from 'src/dtos/common/id.dto';
import { CreateProductDto } from '../product/create-product.dto';
import { MOCK_PRODUCTS } from 'src/constants/mock.constants';

class _BaseCreateInvoiceItemDto {
    @ApiProperty({ example: 100 })
    @IsNumber()
    @Min(0)
    price: number;

    @ApiProperty({ example: 2 })
    @IsNumber()
    @Min(0)
    quantity: number;

    @ApiProperty({ example: 200 })
    @IsNumber()
    @Min(0)
    originalAmount: number;

    @ApiProperty({ example: 80 })
    @IsInt()
    @Min(0)
    @Max(100)
    discount: number;

    @ApiProperty({ example: 160 })
    @IsNumber()
    @Min(0)
    amount: number;

    @ApiPropertyOptional({ examples: [null, 50], nullable: true })
    @IsNumber()
    @Min(0)
    @IsOptional()
    @ValidateIf((_, value) => value !== null)
    weight?: number | null;

    @ApiProperty({ example: 'remark#1' })
    @IsString()
    remark: string;

    @ApiProperty({ examples: [true, false] })
    @IsBoolean()
    delivered: boolean;
}

// for creating invoice item that belongs to order
export class CreateOrderItemDto extends _BaseCreateInvoiceItemDto {
    @ApiProperty({
        oneOf: [
            { $ref: getSchemaPath(IdDto) },
            { $ref: getSchemaPath(CreateProductDto) },
        ],
        examples: [{ id: 1 }, ...MOCK_PRODUCTS],
    })
    @IsObject()
    @ValidateNested()
    @Type((options) => (options.object.product?.id ? IdDto : CreateProductDto))
    product: IdDto | CreateProductDto;
}

// for creating invoice item that belongs to refund
export class CreateRefundItemDto extends _BaseCreateInvoiceItemDto {
    @ApiProperty({ type: IdDto, example: { id: 1 } })
    @IsObject()
    @ValidateNested()
    @Type(() => IdDto)
    product: IdDto;

    @ApiProperty({ type: IdDto, example: { id: 1 } })
    @IsObject()
    @ValidateNested()
    @Type(() => IdDto)
    orderItem: IdDto;
}
