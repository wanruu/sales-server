import { ApiProperty } from '@nestjs/swagger';

export class BaseProductDto {
    @ApiProperty()
    id: number;

    @ApiProperty()
    material: string;

    @ApiProperty()
    name: string;

    @ApiProperty()
    spec: string;

    @ApiProperty()
    unit: string;

    @ApiProperty()
    quantity: number;
}
