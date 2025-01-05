import { ApiProperty } from '@nestjs/swagger';
import { IsArray } from 'class-validator';
import { PageMetaDto } from './page-meta.dto';

export class PageDto<T> {
    @ApiProperty({ type: 'array' })
    @IsArray()
    data: T[];

    @ApiProperty({ type: () => PageMetaDto })
    meta: PageMetaDto;

    constructor(data: T[], meta: PageMetaDto) {
        this.data = data;
        this.meta = meta;
    }
}
