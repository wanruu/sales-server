import {
    ApiExtraModels,
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
    IsDateString,
} from 'class-validator';
import { DeliveryStatus, InvoiceType } from 'src/constants/invoice.constant';
import { IdDto, NullIdDto } from 'src/dtos/common/id.dto';
import { CreatePartnerDto } from '../partner/create-partner.dto';
import {
    CreateOrderItemDto,
    CreateRefundItemDto,
} from './create-invoice-item.dto';

export class CreateInvoiceDto {
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
    @Type((options) => (options.object.partner?.id ? IdDto : CreatePartnerDto))
    partner: IdDto | CreatePartnerDto;

    @ApiProperty({ type: Date })
    @IsDateString()
    date: string;

    @ApiProperty({
        isArray: true,
        oneOf: [
            { $ref: getSchemaPath(CreateOrderItemDto) },
            { $ref: getSchemaPath(CreateRefundItemDto) },
        ],
    })
    @IsArray()
    @ValidateNested({ each: true })
    @Type((options) =>
        [InvoiceType.SalesRefund, InvoiceType.PurchaseRefund].includes(
            options.object.type,
        )
            ? CreateRefundItemDto
            : CreateOrderItemDto,
    )
    invoiceItems: CreateOrderItemDto[] | CreateRefundItemDto[];

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

    @ApiExtraModels(NullIdDto)
    @ApiPropertyOptional({
        oneOf: [
            { $ref: getSchemaPath(IdDto) },
            { $ref: getSchemaPath(NullIdDto) },
        ],
        examples: [{ id: 1 }, { id: null }],
    })
    @IsOptional()
    @IsObject()
    @ValidateNested()
    @Type((options) =>
        [InvoiceType.SalesRefund, InvoiceType.PurchaseRefund].includes(
            options.object.type,
        )
            ? IdDto
            : NullIdDto,
    )
    order?: NullIdDto | IdDto;
}
