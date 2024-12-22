import { ApiProperty } from '@nestjs/swagger';

export class BaseUserDto {
    @ApiProperty()
    id: number;

    @ApiProperty()
    name: string;
}
