import { InjectRepository } from '@nestjs/typeorm';
import { InvoiceItem } from 'src/modules/invoice-items/invoice-item.entity';
import {
    type FindManyOptions,
    type FindOneOptions,
    type FindOptionsWhere,
    Repository,
} from 'typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateInvoiceItemDto } from 'src/modules/invoice-items/dtos/invoice-item-request.dtos';
import { BaseInvoiceItemDto } from 'src/modules/invoice-items/dtos/base-invoice-item.dto';
import { UpdateInvoiceItemDto } from 'src/modules/invoice-items/dtos/invoice-item-request.dtos';
import { PageOptionsDto } from 'src/common/dtos/page-options.dto';
import { PageDto } from 'src/common/dtos/page.dto';
import { PageMetaDto } from 'src/common/dtos/page-meta.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class InvoiceItemsService {
    constructor(
        @InjectRepository(InvoiceItem)
        private invoiceItemRepository: Repository<InvoiceItem>,
    ) {}

    async findOne(options: FindOneOptions<InvoiceItem>): Promise<InvoiceItem> {
        const invoiceItem = await this.invoiceItemRepository.findOne(options);
        if (!invoiceItem) {
            throw new NotFoundException('Invoice item not found.');
        }
        return plainToInstance(InvoiceItem, invoiceItem);
    }

    async findMany(
        pageOptionsDto: PageOptionsDto,
        options?: FindManyOptions<InvoiceItem>,
    ): Promise<PageDto<InvoiceItem>> {
        const invoiceItems = await this.invoiceItemRepository.find({
            ...options,
            order: { createdAt: pageOptionsDto.order },
            skip: pageOptionsDto.skip,
            take: pageOptionsDto.take,
        });
        const pageMetaDto = new PageMetaDto({
            itemCount: invoiceItems.length,
            pageOptionsDto,
        });
        return new PageDto(invoiceItems, pageMetaDto);
    }

    async createOne(
        dto: CreateInvoiceItemDto & { user: { id: number } },
    ): Promise<BaseInvoiceItemDto> {
        const invoiceItem = this.invoiceItemRepository.create(dto);
        const savedInvoiceItem =
            await this.invoiceItemRepository.save(invoiceItem);
        const { user, deletedAt, createdAt, updatedAt, ...rest } =
            savedInvoiceItem;
        return rest;
    }

    async updateOne(
        options: FindOneOptions<InvoiceItem>,
        dto: UpdateInvoiceItemDto,
    ): Promise<BaseInvoiceItemDto> {
        const oldInvoiceItem =
            await this.invoiceItemRepository.findOne(options);
        if (!oldInvoiceItem) {
            throw new NotFoundException('Invoice item not found.');
        }
        const savedInvoiceItem = await this.invoiceItemRepository.save({
            ...oldInvoiceItem,
            ...dto,
        });
        const { user, updatedAt, ...rest } = savedInvoiceItem;
        return rest;
    }

    async deleteMany(criteria: FindOptionsWhere<InvoiceItem>): Promise<void> {
        const deleteResult = await this.invoiceItemRepository.delete(criteria);
        if (deleteResult.affected === 0) {
            throw new NotFoundException('Invoice item not found.');
        }
    }
}
