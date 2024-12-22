import { ApiProperty } from '@nestjs/swagger';

export class LoginResponseDto {
    @ApiProperty()
    id: number;

    @ApiProperty()
    accessToken: string;
}
