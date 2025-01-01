import { ApiProperty } from '@nestjs/swagger';
import {
    IsBoolean,
    IsInt,
    IsNumber,
    IsString,
    Max,
    Min,
    ValidateIf,
} from 'class-validator';
export class BaseInvoiceItemDto {
    @ApiProperty({
        example: 1,
        description: 'Unique identifier of the invoice item.',
    })
    id: number;

    @ApiProperty({ example: 100, description: 'Price of the invoice item.' })
    @IsNumber()
    price: number;

    @ApiProperty({ example: 2, description: 'Quantity of the invoice item.' })
    @IsNumber()
    quantity: number;

    @ApiProperty({
        example: 200,
        description: 'Original amount of the invoice item.',
    })
    @IsNumber()
    originalAmount: number;

    @ApiProperty({
        example: 80,
        description: 'Discount percentage of the invoice item.',
    })
    @IsInt()
    @Min(0)
    @Max(100)
    discount: number;

    @ApiProperty({
        example: 160,
        description: 'Amount of the invoice item after discount.',
    })
    @IsNumber()
    amount: number;

    @ApiProperty({
        oneOf: [{ type: 'number' }, { type: 'null' }],
        examples: [50, null],
        description: 'Weight of the invoice item.',
    })
    @IsNumber()
    @ValidateIf((_, value) => value !== null)
    weight: number | null;

    @ApiProperty({
        example: 'remark#1',
        description: 'Remark of the invoice item.',
    })
    @IsString()
    remark: string;

    @ApiProperty({
        examples: [true, false],
        description: 'Whether the invoice item is delivered.',
    })
    @IsBoolean()
    delivered: boolean;
}
