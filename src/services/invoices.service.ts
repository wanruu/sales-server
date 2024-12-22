import {
    ConflictException,
    Injectable,
    InternalServerErrorException,
    NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InvoiceType } from 'src/constants/invoice.constant';
import {
    CreateInvoiceDto,
    CreateOneInvoiceResponseDto,
} from 'src/dtos/invoice/create-invoice.dto';
import {
    FindManyInvoiceResponseDto,
    FindOneInvoiceResponseDto,
} from 'src/dtos/invoice/find-invoice.dto';
import {
    UpdateInvoiceDto,
    UpdateOneInvoiceResponseDto,
} from 'src/dtos/invoice/update-invoice.dto';
import { Invoice } from 'src/entities/invoice.entity';
import {
    type FindManyOptions,
    type FindOneOptions,
    type FindOptionsWhere,
    Repository,
} from 'typeorm';

const handleError = (error: any) => {
    if (error.code === '23505') {
        throw new ConflictException('Invoice already exists.');
    }
    if (error.code === '23503') {
        if (error.constraint === 'fk_invoice_partner') {
            throw new NotFoundException('Partner not found.');
        }
        if (error.constraint === 'fk_invoice_order') {
            throw new NotFoundException('Order not found.');
        }
        if (error.constraint === 'fk_invoice_user') {
            throw new NotFoundException('User not found.');
        }
    }
    throw new InternalServerErrorException();
};

function getInvoicePrefix(date: Date) {
    let month = '' + (date.getMonth() + 1);
    let day = '' + date.getDate();
    const year = date.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('');
}

@Injectable()
export class InvoicesService {
    constructor(
        @InjectRepository(Invoice)
        private invoiceRepository: Repository<Invoice>,
    ) {}

    async findOne(
        options: FindOneOptions<Invoice>,
    ): Promise<FindOneInvoiceResponseDto> {
        const invoice = await this.invoiceRepository.findOne(options);
        if (!invoice) {
            throw new NotFoundException('Invoice not found.');
        }
        return invoice;
    }

    async findMany(
        options?: FindManyOptions<Invoice>,
    ): Promise<FindManyInvoiceResponseDto[]> {
        const invoices = await this.invoiceRepository.find(options);
        return invoices;
    }

    async createOne(
        dto: CreateInvoiceDto & { user: { id: number } },
    ): Promise<CreateOneInvoiceResponseDto> {
        try {
            const invoice = this.invoiceRepository.create({
                ...dto,
                number: await this.getNextNumber(dto.type, new Date()),
            });
            const savedInvoice = await this.invoiceRepository.save(invoice);
            const { user, deletedAt, createdAt, updatedAt, ...rest } =
                savedInvoice;
            return rest;
        } catch (error) {
            handleError(error);
        }
    }

    async updateOne(
        options: FindOneOptions<Invoice>,
        dto: UpdateInvoiceDto,
    ): Promise<UpdateOneInvoiceResponseDto> {
        const oldInvoice = await this.invoiceRepository.findOne(options);
        if (!oldInvoice) {
            throw new NotFoundException('Invoice not found.');
        }
        try {
            const savedInvoice = await this.invoiceRepository.save({
                ...oldInvoice,
                ...dto,
            });
            const { user, updatedAt, ...rest } = savedInvoice;
            return rest;
        } catch (error) {
            handleError(error);
        }
    }

    async deleteMany(criteria: FindOptionsWhere<Invoice>): Promise<void> {
        const updateResult = await this.invoiceRepository.delete(criteria);
        if (updateResult.affected === 0) {
            throw new NotFoundException('Invoice not found.');
        }
    }

    async getNextNumber(type: InvoiceType, date: Date): Promise<string> {
        const prefix = getInvoicePrefix(date);
        const maxRecord = await this.invoiceRepository
            .createQueryBuilder()
            .where('type = :type AND number LIKE :prefix', {
                type,
                prefix: `${prefix}%`,
            })
            .select('MAX(number)', 'maxNumber')
            .getRawOne();
        const nextNumber = parseInt(maxRecord?.maxNumber?.slice(9) || 0) + 1;
        const suffix = nextNumber.toString().padStart(4, '0');
        return `${prefix}${suffix}`;
    }
}
