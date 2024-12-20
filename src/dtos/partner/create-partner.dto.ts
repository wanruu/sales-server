import { Transform } from 'class-transformer';
import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreatePartnerDto {
    @Transform((params) => params.value?.toString()?.trim())
    @IsString()
    @MaxLength(100)
    @IsNotEmpty()
    name: string;

    @Transform((params) => params.value?.toString()?.trim())
    @IsString()
    @IsOptional()
    @MaxLength(20)
    phone?: string;

    @Transform((params) => params.value?.toString()?.trim())
    @IsString()
    @IsOptional()
    address?: string;

    @Transform((params) => params.value?.toString()?.trim())
    @IsString()
    @IsOptional()
    folder?: string;
}
