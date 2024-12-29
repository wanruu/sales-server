import { ApiProperty } from '@nestjs/swagger';
import { IsInt, ValidateIf } from 'class-validator';

export class IdDto {
    @ApiProperty()
    @IsInt()
    id: number;
}

export class NullableIdDto {
    @ApiProperty({ nullable: true })
    @IsInt()
    @ValidateIf((_, value) => value !== null)
    id: number | null;
}
