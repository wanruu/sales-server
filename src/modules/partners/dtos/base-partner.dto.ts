import { ApiProperty } from '@nestjs/swagger';
import { Expose, Transform } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString, MaxLength } from 'class-validator';

export class BasePartnerDto {
    @ApiProperty({
        example: 1,
        description: 'Unique identifier of the partner.',
    })
    @IsNumber()
    @Expose()
    id: number;

    @ApiProperty({
        example: 'name#1',
        description: 'Name of the partner, at most 100 characters.',
    })
    @Transform(({ value }) => value?.toString()?.trim(), { toClassOnly: true })
    @IsString()
    @MaxLength(100)
    @IsNotEmpty()
    @Expose()
    name: string;

    @ApiProperty({
        example: 'phone#1',
        description: 'Phone number of the partner, at most 20 characters.',
    })
    @Transform(({ value }) => value?.toString()?.trim(), { toClassOnly: true })
    @IsString()
    @MaxLength(20)
    @Expose()
    phone: string;

    @ApiProperty({
        example: 'address#1',
        description: 'Address of the partner.',
    })
    @Transform(({ value }) => value?.toString()?.trim(), { toClassOnly: true })
    @IsString()
    @Expose()
    address: string;

    @ApiProperty({
        example: 'folder#1',
        description: 'Folder of the partner.',
    })
    @Transform(({ value }) => value?.toString()?.trim(), { toClassOnly: true })
    @IsString()
    @Expose()
    folder: string;
}
