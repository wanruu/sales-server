import { ApiProperty } from '@nestjs/swagger';

export class FindOneUserResponseDto {
    @ApiProperty({ example: 1 })
    id: number;

    @ApiProperty({ example: 'Hermione' })
    name: string;
}
