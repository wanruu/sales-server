import { InjectRepository } from '@nestjs/typeorm';
import { InvoiceItem } from 'src/entities/invoice-item.entity';
import {
    type FindManyOptions,
    type FindOneOptions,
    type FindOptionsWhere,
    Repository,
} from 'typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateInvoiceItemDto } from 'src/dtos/request/invoice-item/create-invoice-item.dto';
import { BaseInvoiceItemDto } from 'src/dtos/common/base-invoice-item.dto';
import { UpdateInvoiceItemDto } from 'src/dtos/request/invoice-item/update-invoice-item.dto';

@Injectable()
export class InvoiceItemsService {
    constructor(
        @InjectRepository(InvoiceItem)
        private invoiceItemRepository: Repository<InvoiceItem>,
    ) {}

    findMany(options?: FindManyOptions<InvoiceItem>): Promise<InvoiceItem[]> {
        return this.invoiceItemRepository.find(options);
    }

    async findOne(options: FindOneOptions<InvoiceItem>): Promise<InvoiceItem> {
        const invoiceItem = await this.invoiceItemRepository.findOne(options);
        if (!invoiceItem) {
            throw new NotFoundException('Invoice item not found.');
        }
        return invoiceItem;
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
