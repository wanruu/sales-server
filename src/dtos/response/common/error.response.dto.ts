import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ErrorResponseDto {
    @ApiProperty()
    message?: string;

    @ApiPropertyOptional()
    error: string;

    @ApiProperty()
    statusCode: number;
}
