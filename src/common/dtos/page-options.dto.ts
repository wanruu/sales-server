import { ApiPropertyOptional } from '@nestjs/swagger';
import { Order } from '../constants/page.constants';
import { IsEnum, IsInt, IsOptional, Max, Min } from 'class-validator';

export class PageOptionsDto {
    @ApiPropertyOptional({ enum: Order, default: Order.ASC })
    @IsEnum(Order)
    @IsOptional()
    order?: Order = Order.ASC;

    @ApiPropertyOptional({ minimum: 1, default: 1 })
    @IsOptional()
    @IsInt()
    @Min(1)
    page?: number = 1;

    @ApiPropertyOptional({ minimum: 1, maximum: 50, default: 10 })
    @IsOptional()
    @IsInt()
    @Min(1)
    @Max(50)
    take?: number = 10;

    get skip(): number {
        return (this.page - 1) * this.take;
    }
}
