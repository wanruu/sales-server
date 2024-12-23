import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
    IsBoolean,
    IsNumber,
    IsEnum,
    IsOptional,
    Min,
    IsObject,
    ValidateNested,
} from 'class-validator';
import { InvoiceType } from 'src/constants/invoice.constant';
import { IdDto } from '../base/id.dto';

export class CreateInvoiceDto {
    @ApiProperty({ enum: InvoiceType })
    @IsEnum(InvoiceType)
    type: InvoiceType;

    @ApiProperty()
    @IsObject()
    @ValidateNested()
    @Type(() => IdDto)
    partner: IdDto;

    @ApiProperty()
    @IsNumber()
    @Min(0)
    amount: number;

    @ApiProperty()
    @IsNumber()
    @Min(0)
    prepayment: number;

    @ApiProperty()
    @IsNumber()
    @Min(0)
    payment: number;

    @ApiProperty()
    @IsBoolean()
    delivered: boolean;

    @ApiPropertyOptional()
    @IsOptional()
    @IsObject()
    @ValidateNested()
    @Type(() => IdDto)
    order?: IdDto;
}

export class CreateOneInvoiceResponseDto {
    @ApiProperty()
    id: number;

    @ApiProperty({ enum: InvoiceType })
    type: InvoiceType;

    @ApiProperty()
    partner: IdDto;

    @ApiProperty()
    amount: number;

    @ApiProperty()
    prepayment: number;

    @ApiProperty()
    payment: number;

    @ApiProperty()
    delivered: boolean;

    @ApiProperty({ nullable: true })
    order: IdDto | null;
}
