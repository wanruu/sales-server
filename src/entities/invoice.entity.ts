import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    OneToOne,
    Unique,
} from 'typeorm';
import { Partner } from 'src/entities/partner.entity';
import { User } from 'src/entities/user.entity';
import { InvoiceItem } from 'src/entities/invoice-item.entity';
import { BaseEntity } from 'src/entities/base.entity';
import { InvoiceType } from 'src/constants/invoice.constant';

@Entity()
@Unique('user invoice unique', ['number', 'type', 'user'])
export class Invoice extends BaseEntity {
    @Column('varchar', { length: 12 })
    number: string;

    @Column('enum', { enum: InvoiceType })
    type: InvoiceType;

    @Column('decimal', { default: 0 })
    amount: number;

    @Column('decimal', { default: 0 })
    prepayment: number;

    @Column('decimal', { default: 0 })
    payment: number;

    @Column('boolean', { default: false })
    delivered: boolean;

    @ManyToOne(() => Partner, (partner) => partner.invoices, {
        onDelete: 'CASCADE',
        cascade: true,
        nullable: false,
    })
    partner: Partner;

    @OneToMany(() => InvoiceItem, (invoiceItem) => invoiceItem.invoice, {
        cascade: true,
        onDelete: 'RESTRICT',
        nullable: false,
    })
    invoiceItems: InvoiceItem[];

    @OneToOne(() => Invoice, (order) => order.refund, { onDelete: 'CASCADE' })
    @JoinColumn()
    order: Invoice;

    @OneToOne(() => Invoice, (refund) => refund.order, { nullable: true })
    refund: Invoice;

    @ManyToOne(() => User, (user) => user.invoices, {
        onDelete: 'CASCADE',
        nullable: false,
    })
    user: User;
}
