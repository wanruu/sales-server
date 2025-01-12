import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { BasePartnerDto } from 'src/modules/partners/dtos/base-partner.dto';

export class FindManyPartnerResponseDto extends BasePartnerDto {
    @ApiProperty()
    @Expose()
    deletable: boolean;
}

export class FindOnePartnerResponseDto extends BasePartnerDto {
    @ApiProperty()
    @Expose()
    deletable: boolean;
}
