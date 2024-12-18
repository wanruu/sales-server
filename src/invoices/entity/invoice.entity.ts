import {
    Column,
    Entity,
    ManyToOne,
    OneToMany,
    OneToOne,
    PrimaryGeneratedColumn,
    Unique,
} from 'typeorm';
import { IsEnum, Length, Min } from 'class-validator';
import { Partner } from 'src/partners/entity/partner.entity';
import { User } from 'src/users/entity/user.entity';
import { InvoiceItem } from './invoice-item.entity';

enum InvoiceType {
    salesOrder,
    purchaseOrder,
    salesRefund,
    purchaseRefund,
}

@Entity()
@Unique(['number', 'type', 'user'])
export class Invoice {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('varchar', { length: 12 })
    @Length(12, 12)
    number: string;

    @Column({ type: 'enum', enum: InvoiceType })
    @IsEnum(InvoiceType)
    type: InvoiceType;

    @ManyToOne(() => Partner, (partner) => partner.invoices)
    partner: Partner;

    @Column('decimal', { default: 0 })
    @Min(0)
    amount: number;

    @Column('decimal', { default: 0 })
    @Min(0)
    prepayment: number;

    @Column('decimal', { default: 0 })
    @Min(0)
    payment: number;

    @Column('boolean', { default: false })
    delivered: boolean;

    @OneToMany(() => InvoiceItem, (invoiceItem) => invoiceItem.invoice)
    invoiceItems: InvoiceItem[];

    @OneToOne(() => Invoice, (invoice) => invoice.relatedInvoice, {
        nullable: true,
    })
    relatedInvoice: Invoice;

    @ManyToOne(() => User, (user) => user.invoices)
    user: User;
}
