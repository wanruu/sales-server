import { ApiProperty, getSchemaPath, OmitType } from '@nestjs/swagger';
import { Expose, Transform, Type } from 'class-transformer';
import {
    IsEnum,
    IsNumber,
    IsNumberString,
    IsObject,
    IsString,
    Length,
    ValidateIf,
    ValidateNested,
} from 'class-validator';
import {
    DeliveryStatus,
    InvoiceType,
} from 'src/common/constants/invoice.constants';
import { IdDto } from 'src/common/dtos/id.dto';
import { BasePartnerDto } from 'src/modules/partners/dtos/base-partner.dto';

export class BaseInvoiceDto {
    @ApiProperty({
        example: 1,
        description: 'Unique identifier of the invoice.',
    })
    @IsNumber()
    @Expose()
    id: number;

    @ApiProperty({
        example: '200012120001',
        description:
            'The number of the invoice, unique for each user and invoice type.',
    })
    @IsString()
    @Length(12, 12)
    @Expose()
    number: string;

    @ApiProperty({
        enum: InvoiceType,
        example: InvoiceType.SalesOrder,
        description: 'The type of the invoice.',
    })
    @IsEnum(InvoiceType)
    @Expose()
    type: InvoiceType;

    @ApiProperty({
        example: '1000',
        description: 'The total amount of the invoice.',
    })
    @IsNumberString()
    @Expose()
    amount: string;

    @ApiProperty({
        example: '50',
        description: 'The prepayment amount of the invoice.',
    })
    @IsNumberString()
    @Expose()
    prepayment: string;

    @ApiProperty({
        example: '200',
        description: 'The payment amount of the invoice.',
    })
    @IsNumberString()
    @Expose()
    payment: string;

    @ApiProperty({ enum: DeliveryStatus })
    @IsEnum(DeliveryStatus)
    @Expose()
    deliveryStatus: DeliveryStatus;

    @ApiProperty({ type: IdDto })
    @IsObject()
    @ValidateNested()
    @Type(() => IdDto)
    @Expose()
    partner: IdDto;

    @ApiProperty({ oneOf: [{ $ref: getSchemaPath(IdDto) }, { type: 'null' }] })
    @IsObject()
    @ValidateNested()
    @Type(() => IdDto)
    @ValidateIf((_, value) => value !== null)
    @Transform(({ value }) => value || null, { toClassOnly: true })
    @Expose()
    order: EntityType<IdDto> | null;
}

export class BaseInvoiceWithPartnerDto extends OmitType(BaseInvoiceDto, [
    'partner',
] as const) {
    @ApiProperty({ type: BasePartnerDto })
    @Type(() => BasePartnerDto)
    @Expose()
    partner: BasePartnerDto;
}
