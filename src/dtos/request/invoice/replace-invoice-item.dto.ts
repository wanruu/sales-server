import { ApiPropertyOptional } from '@nestjs/swagger';
import {
    CreateOrderItemDto,
    CreateRefundItemDto,
} from './create-invoice-item.dto';
import { IsInt, IsOptional } from 'class-validator';

export class ReplaceOrderItemDto extends CreateOrderItemDto {
    @ApiPropertyOptional()
    @IsInt()
    @IsOptional()
    id: number;
}

export class ReplaceRefundItemDto extends CreateRefundItemDto {
    @ApiPropertyOptional()
    @IsInt()
    @IsOptional()
    id: number;
}
