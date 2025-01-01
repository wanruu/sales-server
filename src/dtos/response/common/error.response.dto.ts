import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ErrorResponseDto {
    @ApiProperty({
        oneOf: [
            { type: 'array', items: { type: 'string' } },
            { type: 'string' },
        ],
    })
    message: string | string[];

    @ApiPropertyOptional()
    error?: string;

    @ApiProperty()
    statusCode: number;
}
