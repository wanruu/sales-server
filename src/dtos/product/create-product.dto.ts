import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsString,
    MaxLength,
} from 'class-validator';

export class CreateProductDto {
    @ApiPropertyOptional({ example: 'material#1' })
    @Transform((params) => params.value?.toString()?.trim())
    @IsString()
    @MaxLength(30)
    @IsOptional()
    material?: string;

    @ApiProperty({ example: 'name#1' })
    @Transform((params) => params.value?.toString()?.trim())
    @IsString()
    @MaxLength(40)
    @IsNotEmpty()
    name: string;

    @ApiProperty({ example: 'spec#1' })
    @Transform((params) => params.value?.toString()?.trim())
    @IsString()
    @MaxLength(30)
    @IsNotEmpty()
    spec: string;

    @ApiProperty({ example: 'unit#1' })
    @Transform((params) => params.value?.toString()?.trim())
    @IsString()
    @MaxLength(10)
    @IsNotEmpty()
    unit: string;

    @ApiPropertyOptional({ example: 10 })
    @IsNumber()
    @IsOptional()
    quantity?: number;
}

export class CreateOneProductResponseDto {
    @ApiProperty({ example: 1 })
    id: number;

    @ApiProperty({ example: 'material#1' })
    material: string;

    @ApiProperty({ example: 'name#1' })
    name: string;

    @ApiProperty({ example: 'spec#1' })
    spec: string;

    @ApiProperty({ example: 'unit#1' })
    unit: string;

    @ApiProperty({ example: 10, nullable: true })
    quantity: number | null;
}
