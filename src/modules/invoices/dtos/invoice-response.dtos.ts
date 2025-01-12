import {
    ApiExtraModels,
    ApiProperty,
    getSchemaPath,
    OmitType,
} from '@nestjs/swagger';
import { BaseInvoiceDto, BaseInvoiceWithPartnerDto } from './base-invoice.dto';
import { BaseInvoiceItemInInvoiceDto } from 'src/modules/invoice-items/dtos/base-invoice-item.dto';
import { Expose, Type } from 'class-transformer';

class FindManyInvoiceResponse__RelatedInvoiceDto extends OmitType(
    BaseInvoiceDto,
    ['partner', 'order'] as const,
) {}

@ApiExtraModels(FindManyInvoiceResponse__RelatedInvoiceDto)
export class FindManyInvoiceResponseDto extends OmitType(
    BaseInvoiceWithPartnerDto,
    ['order'] as const,
) {
    @ApiProperty({
        oneOf: [
            { type: 'null' },
            { $ref: getSchemaPath(FindManyInvoiceResponse__RelatedInvoiceDto) },
        ],
    })
    @Type(() => FindManyInvoiceResponse__RelatedInvoiceDto)
    @Expose()
    order: EntityType<FindManyInvoiceResponse__RelatedInvoiceDto> | null;

    @ApiProperty({
        oneOf: [
            { type: 'null' },
            { $ref: getSchemaPath(FindManyInvoiceResponse__RelatedInvoiceDto) },
        ],
    })
    @Type(() => FindManyInvoiceResponse__RelatedInvoiceDto)
    @Expose()
    refund: EntityType<FindManyInvoiceResponse__RelatedInvoiceDto> | null;
}

@ApiExtraModels(BaseInvoiceItemInInvoiceDto)
class FindOneInvoiceResponse__RelatedInvoiceDto extends OmitType(
    BaseInvoiceDto,
    ['partner', 'order'] as const,
) {
    @ApiProperty({
        isArray: true,
        type: BaseInvoiceItemInInvoiceDto,
    })
    @Type(() => BaseInvoiceItemInInvoiceDto)
    @Expose()
    invoiceItems: BaseInvoiceItemInInvoiceDto[];
}

@ApiExtraModels(FindOneInvoiceResponse__RelatedInvoiceDto)
export class FindOneInvoiceResponseDto extends OmitType(
    BaseInvoiceWithPartnerDto,
    ['order'] as const,
) {
    @ApiProperty({ isArray: true, type: BaseInvoiceItemInInvoiceDto })
    @Type(() => BaseInvoiceItemInInvoiceDto)
    @Expose()
    invoiceItems: BaseInvoiceItemInInvoiceDto[];

    @ApiProperty({
        oneOf: [
            { type: 'null' },
            { $ref: getSchemaPath(FindOneInvoiceResponse__RelatedInvoiceDto) },
        ],
    })
    @Type(() => FindOneInvoiceResponse__RelatedInvoiceDto)
    @Expose()
    order: EntityType<FindOneInvoiceResponse__RelatedInvoiceDto> | null;

    @ApiProperty({
        oneOf: [
            { type: 'null' },
            { $ref: getSchemaPath(FindOneInvoiceResponse__RelatedInvoiceDto) },
        ],
    })
    @Type(() => FindOneInvoiceResponse__RelatedInvoiceDto)
    @Expose()
    refund: EntityType<FindOneInvoiceResponse__RelatedInvoiceDto> | null;
}
