import { ApiProperty, getSchemaPath, OmitType } from '@nestjs/swagger';
import { Expose, Transform, Type } from 'class-transformer';
import {
    IsBoolean,
    IsInt,
    IsNumberString,
    IsObject,
    IsString,
    Max,
    Min,
    ValidateIf,
    ValidateNested,
} from 'class-validator';
import { IdDto } from 'src/common/dtos/id.dto';
import { BaseProductDto } from 'src/modules/products/dtos/base-product.dto';

export class BaseInvoiceItemDto {
    @ApiProperty({
        example: 1,
        description: 'Unique identifier of the invoice item.',
    })
    @IsInt()
    @Expose()
    id: number;

    @ApiProperty({ example: '100', description: 'Price of the invoice item.' })
    @IsNumberString()
    @Expose()
    price: string;

    @ApiProperty({ example: '2', description: 'Quantity of the invoice item.' })
    @IsNumberString()
    @Expose()
    quantity: string;

    @ApiProperty({
        example: '200',
        description: 'Original amount of the invoice item.',
    })
    @IsNumberString()
    @Expose()
    originalAmount: string;

    @ApiProperty({
        example: 80,
        description: 'Discount percentage of the invoice item.',
    })
    @IsInt()
    @Min(0)
    @Max(100)
    @Expose()
    discount: number;

    @ApiProperty({
        example: '160',
        description: 'Amount of the invoice item after discount.',
    })
    @IsNumberString()
    @Expose()
    amount: string;

    @ApiProperty({
        oneOf: [{ type: 'string' }, { type: 'null' }],
        examples: ['50', null],
        description: 'Weight of the invoice item.',
    })
    @IsNumberString()
    @ValidateIf((_, value) => value !== null)
    @Expose()
    weight: string | null;

    @ApiProperty({
        example: 'remark#1',
        description: 'Remark of the invoice item.',
    })
    @IsString()
    @Expose()
    remark: string;

    @ApiProperty({
        examples: [true, false],
        description: 'Whether the invoice item is delivered.',
    })
    @IsBoolean()
    @Expose()
    delivered: boolean;

    @ApiProperty({ type: IdDto, example: { id: 1 } })
    @IsObject()
    @ValidateNested()
    @Type(() => IdDto)
    @Expose()
    product: IdDto;

    @ApiProperty({ oneOf: [{ $ref: getSchemaPath(IdDto) }, { type: 'null' }] })
    @IsObject()
    @ValidateNested()
    @Type(() => IdDto)
    @ValidateIf((_, value) => value !== null)
    @Transform(({ value }) => value || null, { toClassOnly: true })
    @Expose()
    invoice: EntityType<IdDto> | null;

    @ApiProperty({ oneOf: [{ $ref: getSchemaPath(IdDto) }, { type: 'null' }] })
    @IsObject()
    @ValidateNested()
    @Type(() => IdDto)
    @Transform(({ value }) => value || null, { toClassOnly: true })
    @Expose()
    orderItem: EntityType<IdDto> | null;
}

// In invoice means:
// 1. contains product complete information
// 2. doesn't contain invoice information
// 3. contains orderItem and refundItem id
export class BaseInvoiceItemInInvoiceDto extends OmitType(BaseInvoiceItemDto, [
    'invoice',
    'product',
] as const) {
    @ApiProperty({ type: BaseProductDto })
    @Type(() => BaseProductDto)
    @Expose()
    product: BaseProductDto;

    @ApiProperty({ oneOf: [{ $ref: getSchemaPath(IdDto) }, { type: 'null' }] })
    @Type(() => IdDto)
    @Transform(({ value }) => value || null, { toClassOnly: true })
    @Expose()
    refundItem: EntityType<IdDto> | null;
}
