import { InjectRepository } from '@nestjs/typeorm';
import { InvoiceItem } from 'src/entities/invoice-item.entity';
import { Repository } from 'typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateInvoiceItemDto } from 'src/dtos/invoice-item/create-invoice-item.dto';
import { UpdateInvoiceItemDto } from 'src/dtos/invoice-item/update-invoice-item.dto';

@Injectable()
export class InvoiceItemsService {
    constructor(
        @InjectRepository(InvoiceItem)
        private invoiceItemRepository: Repository<InvoiceItem>,
    ) {}

    async create(dto: CreateInvoiceItemDto): Promise<InvoiceItem> {
        return await this.invoiceItemRepository.save(dto);
    }

    async update(id: number, dto: UpdateInvoiceItemDto): Promise<InvoiceItem> {
        const oldInvoiceItem = await this.invoiceItemRepository.findOneBy({
            id,
        });
        if (!oldInvoiceItem) {
            throw new NotFoundException('Invoice item not found.');
        }
        return await this.invoiceItemRepository.save({
            ...oldInvoiceItem,
            ...dto,
        });
    }

    async delete(id: number, userId: number): Promise<void> {
        const updateResult = await this.invoiceItemRepository.delete({
            id,
            user: { id: userId },
        });
        if (updateResult.affected === 0) {
            throw new NotFoundException('Invoice item not found.');
        }
    }
}
