import { ApiProperty } from '@nestjs/swagger';
import { Expose, Transform } from 'class-transformer';
import {
    IsNotEmpty,
    IsNumber,
    IsNumberString,
    IsString,
    MaxLength,
} from 'class-validator';

export class BaseProductDto {
    @ApiProperty({
        example: 1,
        description: 'Unique identifier of the product.',
    })
    @IsNumber()
    @Expose()
    id: number;

    @ApiProperty({
        example: 'material#1',
        description: 'Material of the product, at most 30 characters.',
    })
    @Transform(({ value }) => value?.toString()?.trim(), { toClassOnly: true })
    @IsString()
    @MaxLength(30)
    @Expose()
    material: string;

    @ApiProperty({
        example: 'name#1',
        description: 'Name of the product, at most 40 characters.',
    })
    @Transform(({ value }) => value?.toString()?.trim(), { toClassOnly: true })
    @IsString()
    @MaxLength(40)
    @IsNotEmpty()
    @Expose()
    name: string;

    @ApiProperty({
        example: 'spec#1',
        description: 'Specification of the product, at most 30 characters.',
    })
    @Transform(({ value }) => value?.toString()?.trim(), { toClassOnly: true })
    @IsString()
    @MaxLength(30)
    @IsNotEmpty()
    @Expose()
    spec: string;

    @ApiProperty({
        example: 'pcs',
        description: 'Unit of the product, at most 10 characters.',
    })
    @Transform(({ value }) => value?.toString()?.trim(), { toClassOnly: true })
    @IsString()
    @MaxLength(10)
    @IsNotEmpty()
    @Expose()
    unit: string;

    @ApiProperty({ example: 10, description: 'Quantity of the product.' })
    @IsNumberString()
    @Expose()
    quantity: string;
}
