import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InvoiceType } from 'src/constants/invoice.constant';
import { CreateInvoiceDto } from 'src/dtos/request/invoice/create-invoice.dto';
import { ReplaceInvoiceDto } from 'src/dtos/request/invoice/replace-invoice.dto';
import { CreateOneInvoiceResponseDto } from 'src/dtos/response/invoice/create-one-invoice.response.dto';

import { Invoice } from 'src/entities/invoice.entity';
import {
    type FindManyOptions,
    type FindOneOptions,
    type FindOptionsWhere,
    Repository,
} from 'typeorm';

@Injectable()
export class InvoicesService {
    constructor(
        @InjectRepository(Invoice)
        private invoiceRepository: Repository<Invoice>,
    ) {}

    async findOne(options: FindOneOptions<Invoice>): Promise<Invoice> {
        const invoice = await this.invoiceRepository.findOne(options);
        if (!invoice) {
            throw new NotFoundException('Invoice not found.');
        }
        return invoice;
    }

    findMany(options?: FindManyOptions<Invoice>): Promise<Invoice[]> {
        return this.invoiceRepository.find(options);
    }

    async createOne(
        dto: CreateInvoiceDto & { user: { id: number } },
    ): Promise<CreateOneInvoiceResponseDto> {
        // prepare cascade create
        const partner = { ...dto.partner, user: dto.user };
        const invoiceItems = dto.invoiceItems.map((item) => ({
            ...item,
            product: { ...item.product, user: dto.user },
            user: dto.user,
        }));

        // get next number
        const number = await this.getNextNumber(
            dto.user.id,
            dto.type,
            new Date(dto.date),
        );

        // create invoice
        const invoice = this.invoiceRepository.create({
            ...dto,
            partner,
            invoiceItems,
            number,
        });
        const savedInvoice = await this.invoiceRepository.save(invoice);

        // return only necessary fields
        const {
            user,
            deletedAt,
            createdAt,
            updatedAt,
            order,
            partner: _partner,
            invoiceItems: _invoiceItems,
            ...rest
        } = savedInvoice;
        return {
            ...rest,
            partner: { id: _partner.id },
            order: { id: order?.id || null },
            invoiceItems: _invoiceItems.map((item) => ({
                id: item.id,
                product: { id: item.product.id },
                orderItem: { id: item.orderItem?.id || null },
            })),
        };
    }

    async replaceOne(
        options: FindOneOptions<Invoice>,
        dto: ReplaceInvoiceDto & { user: { id: number } },
    ): Promise<CreateOneInvoiceResponseDto> {
        const oldInvoice = await this.invoiceRepository.findOne(options);
        if (!oldInvoice) {
            throw new NotFoundException('Invoice not found.');
        }

        // prepare cascade create
        const partner = { ...dto.partner, user: dto.user };
        const invoiceItems = dto.invoiceItems.map((item) => ({
            ...item,
            weight: item.weight || null,
            orderItem: item.orderItem || { id: null },
            product: { ...item.product, user: dto.user },
            user: dto.user,
        }));

        // create invoice
        const savedInvoice = await this.invoiceRepository.save({
            ...oldInvoice,
            ...dto,
            partner,
            invoiceItems,
        });

        const {
            user,
            updatedAt,
            order,
            partner: _partner,
            invoiceItems: _invoiceItems,
            ...rest
        } = savedInvoice;
        return {
            ...rest,
            partner: { id: _partner.id },
            order: { id: order?.id || null },
            invoiceItems: _invoiceItems.map((item) => ({
                id: item.id,
                product: { id: 'id' in item.product ? item.product.id : null },
                orderItem: { id: item.orderItem?.id || null },
            })),
        };
    }

    async deleteMany(criteria: FindOptionsWhere<Invoice>): Promise<void> {
        const deleteResult = await this.invoiceRepository.delete(criteria);
        if (deleteResult.affected === 0) {
            throw new NotFoundException('Invoice not found.');
        }
    }

    private async getNextNumber(
        userId: number,
        type: InvoiceType,
        date: Date,
    ): Promise<string> {
        // get prefix
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        const year = date.getFullYear().toString();
        const prefix = [year, month, day].join('');

        // get suffix
        const maxRecord = await this.invoiceRepository
            .createQueryBuilder()
            .where({ user: { id: userId }, type })
            .andWhere('number LIKE :pattern', { pattern: `${prefix}%` })
            .select('MAX(number)', 'maxNumber')
            .getRawOne();
        const nextNumber = parseInt(maxRecord?.maxNumber?.slice(9) || 0) + 1;
        const suffix = nextNumber.toString().padStart(4, '0');

        return `${prefix}${suffix}`;
    }
}
