import { ApiProperty } from '@nestjs/swagger';
import { BaseProductDto } from './base-product.dto';
import { Expose } from 'class-transformer';

export class FindOneProductResponseDto extends BaseProductDto {
    @ApiProperty()
    @Expose()
    deletable: boolean;
}

export class FindManyProductResponseDto extends BaseProductDto {
    @ApiProperty()
    @Expose()
    deletable: boolean;
}
