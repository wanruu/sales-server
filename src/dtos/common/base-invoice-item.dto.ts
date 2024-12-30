import { ApiProperty } from '@nestjs/swagger';
export class BaseInvoiceItemDto {
    @ApiProperty()
    id: number;

    @ApiProperty()
    price: number;

    @ApiProperty()
    quantity: number;

    @ApiProperty()
    originalAmount: number;

    @ApiProperty()
    discount: number;

    @ApiProperty()
    amount: number;

    @ApiProperty({ nullable: true })
    weight: number | null;

    @ApiProperty()
    remark: string;

    @ApiProperty()
    delivered: boolean;
}
