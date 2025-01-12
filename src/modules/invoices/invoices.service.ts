import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';
import { InvoiceType } from 'src/common/constants/invoice.constants';
import { Order } from 'src/common/constants/page.constants';
import { PageMetaDto } from 'src/common/dtos/page-meta.dto';
import { PageOptionsDto } from 'src/common/dtos/page-options.dto';
import { PageDto } from 'src/common/dtos/page.dto';
import { CreateInvoiceDto } from 'src/modules/invoices/dtos/invoice-request.dtos';
import { ReplaceInvoiceDto } from 'src/modules/invoices/dtos/invoice-request.dtos';
import {
    FindManyInvoiceResponseDto,
    FindOneInvoiceResponseDto,
} from 'src/modules/invoices/dtos/invoice-response.dtos';
import { Invoice } from 'src/modules/invoices/invoice.entity';
import { type FindOptionsWhere, Repository } from 'typeorm';
import { BaseInvoiceDto } from './dtos/base-invoice.dto';

@Injectable()
export class InvoicesService {
    constructor(
        @InjectRepository(Invoice)
        private invoiceRepository: Repository<Invoice>,
    ) {}

    async findOne(
        where: FindOptionsWhere<Invoice>,
    ): Promise<FindOneInvoiceResponseDto> {
        const invoice = await this.invoiceRepository.findOne({
            where,
            relations: {
                partner: true,
                invoiceItems: {
                    product: true,
                    orderItem: true,
                    refundItem: true,
                },
                order: { invoiceItems: { product: true, refundItem: true } },
                refund: { invoiceItems: { product: true, orderItem: true } },
            },
            order: { invoiceItems: { id: Order.ASC } },
        });
        if (!invoice) {
            throw new NotFoundException('Invoice not found.');
        }
        return plainToInstance(FindOneInvoiceResponseDto, invoice, {
            excludeExtraneousValues: true,
        });
    }

    async findMany(
        where: FindOptionsWhere<Invoice>,
        pageOptionsDto: PageOptionsDto,
    ): Promise<PageDto<FindManyInvoiceResponseDto>> {
        const invoices = await this.invoiceRepository.find({
            where,
            relations: { partner: true, order: true, refund: true },
            order: { createdAt: pageOptionsDto.order },
            skip: pageOptionsDto.skip,
            take: pageOptionsDto.take,
        });
        const pageMetaDto = new PageMetaDto({
            itemCount: invoices.length,
            pageOptionsDto,
        });
        return new PageDto(
            plainToInstance(FindManyInvoiceResponseDto, invoices, {
                excludeExtraneousValues: true,
            }),
            pageMetaDto,
        );
    }

    async createOne(
        dto: CreateInvoiceDto & { user: { id: number } },
    ): Promise<BaseInvoiceDto> {
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

        return plainToInstance(BaseInvoiceDto, savedInvoice, {
            excludeExtraneousValues: true,
        });
    }

    async replaceOne(
        where: FindOptionsWhere<Invoice>,
        dto: ReplaceInvoiceDto & { user: { id: number } },
    ): Promise<BaseInvoiceDto> {
        const oldInvoice = await this.invoiceRepository.findOneBy(where);
        if (!oldInvoice) {
            throw new NotFoundException('Invoice not found.');
        }

        // prepare cascade create
        const partner = { ...dto.partner, user: dto.user };
        const invoiceItems = dto.invoiceItems.map((item) => ({
            ...item,
            weight: item.weight || null,
            orderItem: item.orderItem || null,
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

        return plainToInstance(BaseInvoiceDto, savedInvoice, {
            excludeExtraneousValues: true,
        });
    }

    async deleteMany(where: FindOptionsWhere<Invoice>): Promise<void> {
        const deleteResult = await this.invoiceRepository.delete(where);
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
