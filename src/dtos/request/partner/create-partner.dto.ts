import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreatePartnerDto {
    @ApiProperty({ example: 'name#1' })
    @Transform((params) => params.value?.toString()?.trim(), {
        toClassOnly: true,
    })
    @IsString()
    @MaxLength(100)
    @IsNotEmpty()
    name: string;

    @ApiPropertyOptional({ example: 'phone#1' })
    @Transform((params) => params.value?.toString()?.trim(), {
        toClassOnly: true,
    })
    @IsString()
    @IsOptional()
    @MaxLength(20)
    phone?: string;

    @ApiPropertyOptional({ example: 'address#1' })
    @Transform((params) => params.value?.toString()?.trim(), {
        toClassOnly: true,
    })
    @IsString()
    @IsOptional()
    address?: string;

    @ApiPropertyOptional({ example: 'folder#1' })
    @Transform((params) => params.value?.toString()?.trim(), {
        toClassOnly: true,
    })
    @IsString()
    @IsOptional()
    folder?: string;
}
