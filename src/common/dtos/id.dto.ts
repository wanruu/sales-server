import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsInt } from 'class-validator';

export class IdDto {
    @ApiProperty()
    @IsInt()
    @Expose()
    id: number;
}
