import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString, MaxLength } from 'class-validator';

export class BasePartnerDto {
    @ApiProperty({
        example: 1,
        description: 'Unique identifier of the partner.',
    })
    @IsNumber()
    id: number;

    @ApiProperty({
        example: 'name#1',
        description: 'Name of the partner, at most 100 characters.',
    })
    @Transform((params) => params.value?.toString()?.trim(), {
        toClassOnly: true,
    })
    @IsString()
    @MaxLength(100)
    @IsNotEmpty()
    name: string;

    @ApiProperty({
        example: 'phone#1',
        description: 'Phone number of the partner, at most 20 characters.',
    })
    @Transform((params) => params.value?.toString()?.trim(), {
        toClassOnly: true,
    })
    @IsString()
    @MaxLength(20)
    phone: string;

    @ApiProperty({
        example: 'address#1',
        description: 'Address of the partner.',
    })
    @Transform((params) => params.value?.toString()?.trim(), {
        toClassOnly: true,
    })
    @IsString()
    address: string;

    @ApiProperty({
        example: 'folder#1',
        description: 'Folder of the partner.',
    })
    @Transform((params) => params.value?.toString()?.trim(), {
        toClassOnly: true,
    })
    @IsString()
    folder: string;
}
