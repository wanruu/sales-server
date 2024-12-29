import {
    ApiProperty,
    ApiPropertyOptional,
    getSchemaPath,
} from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
    IsNumber,
    IsEnum,
    IsOptional,
    Min,
    IsObject,
    ValidateNested,
    IsArray,
} from 'class-validator';
import {
    DeliveryStatus,
    InvoiceType,
    isOrder,
} from 'src/constants/invoice.constant';
import { IdDto, NullableIdDto } from 'src/dtos/common/id.dto';
import { CreatePartnerDto } from '../partner/create-partner.dto';
import {
    ReplaceOrderItemDto,
    ReplaceRefundItemDto,
} from './replace-invoice-item.dto';

export class ReplaceInvoiceDto {
    @ApiProperty({ enum: InvoiceType, example: InvoiceType.SalesOrder })
    @IsEnum(InvoiceType)
    type: InvoiceType;

    @ApiProperty({
        oneOf: [
            { $ref: getSchemaPath(IdDto) },
            { $ref: getSchemaPath(CreatePartnerDto) },
        ],
        examples: [{ id: 1 }, { name: 'partner#1' }],
    })
    @IsObject()
    @ValidateNested()
    @Type((options) => (options.object.partner.id ? IdDto : CreatePartnerDto))
    partner: IdDto | CreatePartnerDto;

    @ApiProperty({
        isArray: true,
        oneOf: [
            { $ref: getSchemaPath(ReplaceOrderItemDto) },
            { $ref: getSchemaPath(ReplaceRefundItemDto) },
        ],
    })
    @IsArray()
    @ValidateNested({ each: true })
    @Type((options) =>
        isOrder(options.object.type)
            ? ReplaceOrderItemDto
            : ReplaceRefundItemDto,
    )
    invoiceItems: ReplaceOrderItemDto[] | ReplaceRefundItemDto[];

    @ApiProperty({ example: 1000 })
    @IsNumber()
    @Min(0)
    amount: number;

    @ApiProperty({ example: 50 })
    @IsNumber()
    @Min(0)
    prepayment: number;

    @ApiProperty({ example: 200 })
    @IsNumber()
    @Min(0)
    payment: number;

    @ApiProperty({ enum: DeliveryStatus, examples: [0, 1, 2] })
    @IsEnum(DeliveryStatus)
    delivered: DeliveryStatus;

    @ApiPropertyOptional({
        type: NullableIdDto,
        examples: [{ id: 1 }, { id: null }],
    })
    @IsOptional()
    @IsObject()
    @ValidateNested()
    @Type(() => NullableIdDto)
    order?: NullableIdDto;
}
