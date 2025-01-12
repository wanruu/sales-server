import { ApiExtraModels, ApiProperty, getSchemaPath } from '@nestjs/swagger';
import { BaseInvoiceItemInInvoiceDto } from './base-invoice-item.dto';
import { BaseInvoiceWithPartnerDto } from 'src/modules/invoices/dtos/base-invoice.dto';
import { Expose, Type } from 'class-transformer';

@ApiExtraModels(BaseInvoiceWithPartnerDto)
export class FindManyInvoiceItemResponseDto extends BaseInvoiceItemInInvoiceDto {
    @ApiProperty({
        oneOf: [
            { type: 'null' },
            { $ref: getSchemaPath(BaseInvoiceWithPartnerDto) },
        ],
    })
    @Type(() => BaseInvoiceWithPartnerDto)
    @Expose()
    invoice: EntityType<BaseInvoiceWithPartnerDto> | null;
}
