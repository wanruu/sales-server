import { InjectRepository } from '@nestjs/typeorm';
import { InvoiceItem } from 'src/modules/invoice-items/invoice-item.entity';
import { type FindOptionsWhere, Repository } from 'typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateInvoiceItemDto } from 'src/modules/invoice-items/dtos/invoice-item-request.dtos';
import { BaseInvoiceItemDto } from 'src/modules/invoice-items/dtos/base-invoice-item.dto';
import { UpdateInvoiceItemDto } from 'src/modules/invoice-items/dtos/invoice-item-request.dtos';
import { PageOptionsDto } from 'src/common/dtos/page-options.dto';
import { PageDto } from 'src/common/dtos/page.dto';
import { PageMetaDto } from 'src/common/dtos/page-meta.dto';
import { plainToInstance } from 'class-transformer';
import { FindManyInvoiceItemResponseDto } from './dtos/invoice-item-response.dtos';

@Injectable()
export class InvoiceItemsService {
    constructor(
        @InjectRepository(InvoiceItem)
        private invoiceItemRepository: Repository<InvoiceItem>,
    ) {}

    async findMany(
        where: FindOptionsWhere<InvoiceItem>,
        pageOptionsDto: PageOptionsDto,
    ): Promise<PageDto<FindManyInvoiceItemResponseDto>> {
        const invoiceItems = await this.invoiceItemRepository.find({
            where,
            relations: {
                orderItem: true,
                refundItem: true,
                product: true,
                invoice: { partner: true },
            },
            order: { createdAt: pageOptionsDto.order },
            skip: pageOptionsDto.skip,
            take: pageOptionsDto.take,
        });
        const pageMetaDto = new PageMetaDto({
            itemCount: invoiceItems.length,
            pageOptionsDto,
        });
        return new PageDto(
            plainToInstance(FindManyInvoiceItemResponseDto, invoiceItems, {
                excludeExtraneousValues: true,
            }),
            pageMetaDto,
        );
    }

    async createOne(
        dto: CreateInvoiceItemDto & { user: { id: number } },
    ): Promise<BaseInvoiceItemDto> {
        const invoiceItem = this.invoiceItemRepository.create(dto);
        const savedInvoiceItem =
            await this.invoiceItemRepository.save(invoiceItem);
        return plainToInstance(BaseInvoiceItemDto, savedInvoiceItem, {
            excludeExtraneousValues: true,
        });
    }

    async updateOne(
        where: FindOptionsWhere<InvoiceItem>,
        dto: UpdateInvoiceItemDto,
    ): Promise<BaseInvoiceItemDto> {
        const oldInvoiceItem = await this.invoiceItemRepository.findOne({
            where,
            loadRelationIds: { relations: ['product'], disableMixedMap: true },
        });
        if (!oldInvoiceItem) {
            throw new NotFoundException('Invoice item not found.');
        }

        const newInvoiceItem = { ...oldInvoiceItem };
        Object.entries(dto).forEach(([key, value]) => {
            if (value !== undefined) newInvoiceItem[key] = value;
        });

        const savedInvoiceItem =
            await this.invoiceItemRepository.save(newInvoiceItem);
        return plainToInstance(BaseInvoiceItemDto, savedInvoiceItem, {
            excludeExtraneousValues: true,
        });
    }

    async deleteMany(where: FindOptionsWhere<InvoiceItem>): Promise<void> {
        const deleteResult = await this.invoiceItemRepository.delete(where);
        if (deleteResult.affected === 0) {
            throw new NotFoundException('Invoice item not found.');
        }
    }
}
