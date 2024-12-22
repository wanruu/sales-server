import { ApiProperty } from '@nestjs/swagger';

export class BasePartnerDto {
    @ApiProperty()
    id: number;

    @ApiProperty()
    name: string;

    @ApiProperty()
    phone: string;

    @ApiProperty()
    address: string;

    @ApiProperty()
    folder: string;
}
