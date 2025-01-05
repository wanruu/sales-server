import {
    IntersectionType,
    PickType,
    PartialType,
    ApiProperty,
    getSchemaPath,
    ApiPropertyOptional,
} from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import {
    IsObject,
    ValidateNested,
    IsOptional,
    IsInt,
    IsArray,
    IsDateString,
} from 'class-validator';
import { IdDto } from 'src/common/dtos/id.dto';
import { BaseInvoiceItemDto } from 'src/modules/invoice-items/dtos/base-invoice-item.dto';
import { CreatePartnerDto } from 'src/modules/partners/dtos/partner-request.dtos';
import { CreateProductDto } from 'src/modules/products/dtos/product-request.dtos';
import { BaseInvoiceDto } from './base-invoice.dto';

class CreateInvoice__InvoiceItemDto extends IntersectionType(
    PickType(BaseInvoiceItemDto, [
        'price',
        'quantity',
        'originalAmount',
        'discount',
        'amount',
        'remark',
        'delivered',
    ] as const),
    PartialType(PickType(BaseInvoiceItemDto, ['weight'] as const)),
) {
    @ApiProperty({
        oneOf: [
            { $ref: getSchemaPath(IdDto) },
            { $ref: getSchemaPath(CreateProductDto) },
        ],
        examples: [
            { id: 1 },
            {
                material: 'material#1',
                name: 'name#1',
                spec: 'spec#1',
                unit: 'unit#1',
            },
            {
                name: 'name#2',
                spec: 'spec#2',
                unit: 'unit#2',
            },
        ],
    })
    @IsObject()
    @ValidateNested()
    @Type((options) => (options?.object.product?.id ? IdDto : CreateProductDto))
    product: IdDto | CreateProductDto;

    @ApiPropertyOptional({
        oneOf: [{ $ref: getSchemaPath(IdDto) }, { type: 'null' }],
        example: { id: 1 },
    })
    @IsOptional()
    @IsObject()
    @ValidateNested()
    @Type(() => IdDto)
    @Transform(
        (params) =>
            params.value === null ? { id: params.value } : params.value,
        { toPlainOnly: true },
    )
    orderItem?: { id: number | null };
}

class ReplaceInvoice__InvoiceItemDto extends CreateInvoice__InvoiceItemDto {
    @ApiPropertyOptional()
    @IsInt()
    @IsOptional()
    id?: number;
}

export class CreateInvoiceDto extends PickType(BaseInvoiceDto, [
    'type',
    'amount',
    'prepayment',
    'payment',
    'delivered',
] as const) {
    @ApiProperty({
        oneOf: [
            { $ref: getSchemaPath(IdDto) },
            { $ref: getSchemaPath(CreatePartnerDto) },
        ],
        examples: [{ id: 1 }, { name: 'partner#1' }],
    })
    @IsObject()
    @ValidateNested()
    @Type((options) => (options?.object.partner?.id ? IdDto : CreatePartnerDto))
    partner: IdDto | CreatePartnerDto;

    @ApiProperty({ type: Date })
    @IsDateString()
    date: string;

    @ApiProperty({ isArray: true, type: CreateInvoice__InvoiceItemDto })
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreateInvoice__InvoiceItemDto)
    invoiceItems: CreateInvoice__InvoiceItemDto[];

    @ApiPropertyOptional({
        examples: [{ id: 1 }, null],
        oneOf: [{ $ref: getSchemaPath(IdDto) }, { type: 'null' }],
    })
    @IsOptional()
    @IsObject()
    @ValidateNested()
    @Type(() => IdDto)
    @Transform(
        (params) =>
            params.value === null ? { id: params.value } : params.value,
        { toPlainOnly: true },
    )
    order?: { id: number | null };
}

export class ReplaceInvoiceDto extends PickType(BaseInvoiceDto, [
    'type',
    'amount',
    'prepayment',
    'payment',
    'delivered',
] as const) {
    @ApiProperty({
        oneOf: [
            { $ref: getSchemaPath(IdDto) },
            { $ref: getSchemaPath(CreatePartnerDto) },
        ],
        examples: [{ id: 1 }, { name: 'partner#1' }],
    })
    @IsObject()
    @ValidateNested()
    @Type((options) => (options?.object.partner.id ? IdDto : CreatePartnerDto))
    partner: IdDto | CreatePartnerDto;

    @ApiProperty({
        isArray: true,
        type: ReplaceInvoice__InvoiceItemDto,
    })
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => ReplaceInvoice__InvoiceItemDto)
    invoiceItems: ReplaceInvoice__InvoiceItemDto[];

    @ApiPropertyOptional({
        examples: [{ id: 1 }, null],
        oneOf: [{ $ref: getSchemaPath(IdDto) }, { type: 'null' }],
    })
    @IsOptional()
    @IsObject()
    @ValidateNested()
    @Type(() => IdDto)
    @Transform(
        (params) =>
            params.value === null ? { id: params.value } : params.value,
        { toPlainOnly: true },
    )
    order?: { id: number | null };
}
