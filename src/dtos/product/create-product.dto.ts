import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
    IsDecimal,
    IsNotEmpty,
    IsOptional,
    IsString,
    MaxLength,
} from 'class-validator';

export class CreateProductDto {
    @ApiPropertyOptional()
    @Transform((params) => params.value?.toString()?.trim())
    @IsOptional()
    @IsString()
    @MaxLength(30)
    material?: string;

    @ApiProperty()
    @Transform((params) => params.value?.toString()?.trim())
    @IsString()
    @MaxLength(40)
    @IsNotEmpty()
    name: string;

    @ApiProperty()
    @Transform((params) => params.value?.toString()?.trim())
    @IsString()
    @MaxLength(30)
    @IsNotEmpty()
    spec: string;

    @ApiProperty()
    @Transform((params) => params.value?.toString()?.trim())
    @IsString()
    @MaxLength(10)
    @IsNotEmpty()
    unit: string;

    @ApiPropertyOptional()
    @IsDecimal()
    quantity?: number;
}
