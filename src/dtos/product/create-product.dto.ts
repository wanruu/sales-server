import { Transform } from 'class-transformer';
import {
    IsDecimal,
    IsNotEmpty,
    IsOptional,
    IsString,
    MaxLength,
} from 'class-validator';

export class CreateProductDto {
    @Transform((params) => params.value?.toString()?.trim())
    @IsOptional()
    @IsString()
    @MaxLength(30)
    material?: string;

    @Transform((params) => params.value?.toString()?.trim())
    @IsString()
    @MaxLength(40)
    @IsNotEmpty()
    name: string;

    @Transform((params) => params.value?.toString()?.trim())
    @IsString()
    @MaxLength(30)
    @IsNotEmpty()
    spec: string;

    @Transform((params) => params.value?.toString()?.trim())
    @IsString()
    @MaxLength(10)
    @IsNotEmpty()
    unit: string;

    @IsDecimal()
    quantity?: number;
}
