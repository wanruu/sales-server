import {
    Column,
    Entity,
    ManyToOne,
    OneToMany,
    OneToOne,
    PrimaryGeneratedColumn,
    Unique,
} from 'typeorm';
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
    number: string;

    @Column({ type: 'enum', enum: InvoiceType })
    type: InvoiceType;

    @ManyToOne(() => Partner, (partner) => partner.invoices, {
        onDelete: 'CASCADE',
    })
    partner: Partner;

    @Column('decimal', { default: 0 })
    amount: number;

    @Column('decimal', { default: 0 })
    prepayment: number;

    @Column('decimal', { default: 0 })
    payment: number;

    @Column('boolean', { default: false })
    delivered: boolean;

    @OneToMany(() => InvoiceItem, (invoiceItem) => invoiceItem.invoice)
    invoiceItems: InvoiceItem[];

    @OneToOne(() => Invoice, (invoice) => invoice.relatedInvoice, {
        nullable: true,
    })
    relatedInvoice: Invoice;

    @ManyToOne(() => User, (user) => user.invoices, { onDelete: 'CASCADE' })
    user: User;
}
