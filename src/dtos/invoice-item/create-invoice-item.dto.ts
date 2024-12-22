import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
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
} from 'class-validator';
import { IdDto } from '../base/id.dto';

export class CreateInvoiceItemDto {
    @ApiProperty()
    @IsObject()
    @ValidateNested()
    @Type(() => IdDto)
    product: IdDto;

    @ApiProperty()
    @IsNumber()
    @Min(0)
    price: number;

    @ApiProperty()
    @IsNumber()
    @Min(0)
    quantity: number;

    @ApiProperty()
    @IsNumber()
    @Min(0)
    originalAmount: number;

    @ApiProperty()
    @IsInt()
    @Min(0)
    @Max(100)
    discount: number;

    @ApiProperty()
    @IsNumber()
    @Min(0)
    amount: number;

    @ApiPropertyOptional()
    @IsNumber()
    @Min(0)
    @IsOptional()
    weight?: number;

    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    remark?: string;

    @ApiProperty()
    @IsBoolean()
    delivered: boolean;

    @ApiPropertyOptional()
    @IsObject()
    @IsOptional()
    @ValidateNested()
    @Type(() => IdDto)
    invoice?: IdDto;
}

export class CreateOneInvoiceItemResponseDto {
    @ApiProperty()
    id: number;

    @ApiProperty()
    product: IdDto;

    @ApiProperty()
    price: number;

    @ApiProperty()
    quantity: number;

    @ApiProperty()
    originalAmount: number;

    @ApiProperty()
    discount: number;

    @ApiProperty()
    amount: number;

    @ApiProperty({ nullable: true })
    weight: number | null;

    @ApiProperty({ nullable: true })
    remark: string | null;

    @ApiProperty()
    delivered: boolean;

    @ApiPropertyOptional()
    invoice?: IdDto;
}
