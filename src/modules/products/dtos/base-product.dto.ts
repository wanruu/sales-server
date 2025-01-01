import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString, MaxLength } from 'class-validator';

export class BaseProductDto {
    @ApiProperty({
        example: 1,
        description: 'Unique identifier of the product.',
    })
    @IsNumber()
    id: number;

    @ApiProperty({
        example: 'material#1',
        description: 'Material of the product, at most 30 characters.',
    })
    @Transform((params) => params.value?.toString()?.trim(), {
        toClassOnly: true,
    })
    @IsString()
    @MaxLength(30)
    material: string;

    @ApiProperty({
        example: 'name#1',
        description: 'Name of the product, at most 40 characters.',
    })
    @Transform((params) => params.value?.toString()?.trim(), {
        toClassOnly: true,
    })
    @IsString()
    @MaxLength(40)
    @IsNotEmpty()
    name: string;

    @ApiProperty({
        example: 'spec#1',
        description: 'Specification of the product, at most 30 characters.',
    })
    @Transform((params) => params.value?.toString()?.trim(), {
        toClassOnly: true,
    })
    @IsString()
    @MaxLength(30)
    @IsNotEmpty()
    spec: string;

    @ApiProperty({
        example: 'pcs',
        description: 'Unit of the product, at most 10 characters.',
    })
    @Transform((params) => params.value?.toString()?.trim(), {
        toClassOnly: true,
    })
    @IsString()
    @MaxLength(10)
    @IsNotEmpty()
    unit: string;

    @ApiProperty({ example: 10, description: 'Quantity of the product.' })
    @IsNumber()
    quantity: number;
}
