import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreatePartnerDto {
    @ApiProperty()
    @Transform((params) => params.value?.toString()?.trim())
    @IsString()
    @MaxLength(100)
    @IsNotEmpty()
    name: string;

    @ApiPropertyOptional()
    @Transform((params) => params.value?.toString()?.trim())
    @IsString()
    @IsOptional()
    @MaxLength(20)
    phone?: string;

    @ApiPropertyOptional()
    @Transform((params) => params.value?.toString()?.trim())
    @IsString()
    @IsOptional()
    address?: string;

    @ApiPropertyOptional()
    @Transform((params) => params.value?.toString()?.trim())
    @IsString()
    @IsOptional()
    folder?: string;
}
