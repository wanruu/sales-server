import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
    IsOptional,
    IsString,
    IsNumber,
    IsObject,
    ValidateNested,
    ValidateIf,
} from 'class-validator';
import { IdDto } from 'src/dtos/common/id.dto';

export class CreateInvoiceItemDto {
    @ApiProperty({ example: 2 })
    @IsNumber()
    quantity: number;

    @ApiPropertyOptional({ examples: [null, 50], nullable: true })
    @IsNumber()
    @IsOptional()
    @ValidateIf((_, value) => value !== null)
    weight?: number | null;

    @ApiProperty({ example: 'remark#1' })
    @IsString()
    remark: string;

    @ApiProperty({ type: IdDto, example: { id: 1 } })
    @IsObject()
    @ValidateNested()
    @Type(() => IdDto)
    product: IdDto;
}
