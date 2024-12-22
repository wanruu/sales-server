import { ApiProperty } from '@nestjs/swagger';

export class FindOneProductResponseDto {
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

export class FindManyProductResponseDto {
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
