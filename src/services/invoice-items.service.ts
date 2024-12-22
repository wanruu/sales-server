import { InjectRepository } from '@nestjs/typeorm';
import { InvoiceItem } from 'src/entities/invoice-item.entity';
import {
    type FindOneOptions,
    type FindOptionsWhere,
    Repository,
} from 'typeorm';
import {
    Injectable,
    InternalServerErrorException,
    NotFoundException,
} from '@nestjs/common';
import {
    CreateInvoiceItemDto,
    CreateOneInvoiceItemResponseDto,
} from 'src/dtos/invoice-item/create-invoice-item.dto';
import {
    UpdateInvoiceItemDto,
    UpdateOneInvoiceItemResponseDto,
} from 'src/dtos/invoice-item/update-invoice-item.dto';

const handleError = (error: any) => {
    if (error.code === '23503') {
        if (error.constraint === 'fk_invoice_item_product') {
            throw new NotFoundException('Product not found.');
        }
        if (error.constraint === 'fk_invoice_item_invoice') {
            throw new NotFoundException('Invoice not found.');
        }
        if (error.constraint === 'fk_invoice_item_user') {
            throw new NotFoundException('User not found.');
        }
    }
    throw new InternalServerErrorException();
};

@Injectable()
export class InvoiceItemsService {
    constructor(
        @InjectRepository(InvoiceItem)
        private invoiceItemRepository: Repository<InvoiceItem>,
    ) {}

    async createOne(
        dto: CreateInvoiceItemDto & { user: { id: number } },
    ): Promise<CreateOneInvoiceItemResponseDto> {
        try {
            const invoiceItem = this.invoiceItemRepository.create(dto);
            const savedInvoiceItem =
                await this.invoiceItemRepository.save(invoiceItem);
            const { user, deletedAt, createdAt, updatedAt, ...rest } =
                savedInvoiceItem;
            return rest;
        } catch (error) {
            handleError(error);
        }
    }

    async updateOne(
        options: FindOneOptions<InvoiceItem>,
        dto: UpdateInvoiceItemDto,
    ): Promise<UpdateOneInvoiceItemResponseDto> {
        const oldInvoiceItem =
            await this.invoiceItemRepository.findOne(options);
        if (!oldInvoiceItem) {
            throw new NotFoundException('Invoice item not found.');
        }
        try {
            const savedInvoiceItem = await this.invoiceItemRepository.save({
                ...oldInvoiceItem,
                ...dto,
            });
            const { user, updatedAt, ...rest } = savedInvoiceItem;
            return rest;
        } catch (error) {
            handleError(error);
        }
    }

    async deleteMany(criteria: FindOptionsWhere<InvoiceItem>): Promise<void> {
        const updateResult = await this.invoiceItemRepository.delete(criteria);
        if (updateResult.affected === 0) {
            throw new NotFoundException('Invoice item not found.');
        }
    }
}
