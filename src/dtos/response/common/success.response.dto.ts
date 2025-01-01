import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class SuccessResponseDto {
    @ApiProperty()
    data: any;

    @ApiPropertyOptional()
    meta?: Record<string, any>;
}
