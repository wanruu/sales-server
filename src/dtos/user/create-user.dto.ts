import { Transform } from 'class-transformer';
import { IsString, MaxLength, MinLength } from 'class-validator';

export class CreateUserDto {
    @Transform((params) => params.value?.toString()?.trim())
    @MinLength(5)
    @MaxLength(35)
    @IsString()
    name: string;

    @Transform((params) => params.value?.toString()?.trim())
    @MinLength(8)
    @MaxLength(255)
    @IsString()
    password: string;
}
