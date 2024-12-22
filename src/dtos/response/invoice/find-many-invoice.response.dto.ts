import { ApiProperty } from '@nestjs/swagger';
import { BaseInvoiceDto } from 'src/dtos/common/base-invoice.dto';
import { IdDto, NullableIdDto } from 'src/dtos/common/id.dto';

export class FindManyInvoiceResponseDto extends BaseInvoiceDto {
    @ApiProperty({ type: IdDto })
    partner: IdDto;

    @ApiProperty({ type: NullableIdDto })
    order: NullableIdDto;
}
