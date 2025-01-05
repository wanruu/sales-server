import { ApiExtraModels, ApiProperty, getSchemaPath } from '@nestjs/swagger';
import { IdDto } from 'src/common/dtos/id.dto';
import { BaseInvoiceDto } from './base-invoice.dto';
import { BaseInvoiceItemDto } from 'src/modules/invoice-items/dtos/base-invoice-item.dto';
import { BasePartnerDto } from 'src/modules/partners/dtos/base-partner.dto';
import { BaseProductDto } from 'src/modules/products/dtos/base-product.dto';

export class CreateOneInvoiceResponseDto extends BaseInvoiceDto {
    @ApiProperty({
        type: 'array',
        items: {
            type: 'object',
            properties: {
                id: { type: 'number' },
                product: { $ref: getSchemaPath(IdDto) },
                orderItem: {
                    oneOf: [{ $ref: getSchemaPath(IdDto) }, { type: 'null' }],
                },
            },
            required: ['id', 'product', 'orderItem'],
        },
    })
    invoiceItems: {
        id: number;
        product: IdDto;
        orderItem: { id: number } | null;
    }[];

    @ApiProperty({ type: IdDto })
    partner: IdDto;

    @ApiProperty({ oneOf: [{ $ref: getSchemaPath(IdDto) }, { type: 'null' }] })
    order: { id: number } | null;
}

export class FindManyInvoiceResponseDto extends BaseInvoiceDto {
    @ApiProperty({ type: IdDto })
    partner: IdDto;

    @ApiProperty({ oneOf: [{ $ref: getSchemaPath(IdDto) }, { type: 'null' }] })
    order: { id: number } | null;
}

class FindOneInvoiceResponse__RelatedInvoiceDto extends BaseInvoiceDto {
    @ApiProperty({
        isArray: true,
        allOf: [
            { $ref: getSchemaPath(BaseInvoiceItemDto) },
            {
                properties: {
                    product: { $ref: getSchemaPath(BaseProductDto) },
                },
                required: ['product'],
            },
        ],
    })
    invoiceItems: (BaseInvoiceItemDto & { product: BaseProductDto })[];
}

@ApiExtraModels(FindOneInvoiceResponse__RelatedInvoiceDto)
export class FindOneInvoiceResponseDto extends BaseInvoiceDto {
    @ApiProperty({
        isArray: true,
        allOf: [
            { $ref: getSchemaPath(BaseInvoiceItemDto) },
            {
                properties: {
                    product: { $ref: getSchemaPath(BaseProductDto) },
                    orderItem: {
                        oneOf: [
                            { $ref: getSchemaPath(IdDto) },
                            { type: 'null' },
                        ],
                    },
                },
                required: ['product', 'orderItem'],
            },
        ],
    })
    invoiceItems: (BaseInvoiceItemDto & {
        product: BaseProductDto;
        orderItem: { id: number } | null;
    })[];

    @ApiProperty({ type: BasePartnerDto })
    partner: BasePartnerDto;

    @ApiProperty({
        oneOf: [
            { type: 'null' },
            { $ref: getSchemaPath(FindOneInvoiceResponse__RelatedInvoiceDto) },
        ],
    })
    order?:
        | (BaseInvoiceDto & {
              invoiceItems: (BaseInvoiceItemDto & {
                  product: BaseProductDto;
              })[];
          })
        | null;

    @ApiProperty({
        oneOf: [
            { type: 'null' },
            { $ref: getSchemaPath(FindOneInvoiceResponse__RelatedInvoiceDto) },
        ],
    })
    refund:
        | (BaseInvoiceDto & {
              invoiceItems: (BaseInvoiceItemDto & {
                  product: BaseProductDto;
              })[];
          })
        | null;
}
