import { ApiProperty } from '@nestjs/swagger';
import { PageOptionsDto } from './page-options.dto';

export interface PageMetaDtoParameters {
    pageOptionsDto: PageOptionsDto;
    itemCount: number;
}

export class PageMetaDto {
    @ApiProperty()
    page: number;

    @ApiProperty()
    take: number;

    @ApiProperty()
    itemCount: number;

    @ApiProperty()
    pageCount: number;

    @ApiProperty()
    hasPreviousPage: boolean;

    @ApiProperty()
    hasNextPage: boolean;

    constructor({ pageOptionsDto, itemCount }: PageMetaDtoParameters) {
        this.page = pageOptionsDto.page;
        this.take = pageOptionsDto.take;
        this.itemCount = itemCount;
        this.pageCount = Math.ceil(this.itemCount / this.take);
        this.hasPreviousPage = this.page > 1;
        this.hasNextPage = this.page < this.pageCount;
    }
}
