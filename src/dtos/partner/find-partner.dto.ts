import { ApiProperty } from '@nestjs/swagger';

export class FindOnePartnerResponseDto {
    @ApiProperty()
    id: number;

    @ApiProperty()
    name: string;

    @ApiProperty({ nullable: true })
    address: string | null;

    @ApiProperty({ nullable: true })
    phone: string | null;

    @ApiProperty({ nullable: true })
    folder: string | null;
}

export class FindManyPartnerResponseDto {
    @ApiProperty()
    id: number;

    @ApiProperty()
    name: string;

    @ApiProperty({ nullable: true })
    address: string | null;

    @ApiProperty({ nullable: true })
    phone: string | null;

    @ApiProperty({ nullable: true })
    folder: string | null;
}
