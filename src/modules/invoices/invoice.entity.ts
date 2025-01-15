import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    OneToOne,
    Unique,
} from 'typeorm';
import { Partner } from 'src/modules/partners/partner.entity';
import { User } from 'src/modules/users/user.entity';
import { InvoiceItem } from 'src/modules/invoice-items/invoice-item.entity';
import { BaseEntity } from 'src/common/entities/base.entity';
import {
    DeliveryStatus,
    InvoiceType,
} from 'src/common/constants/invoice.constants';
import { Constraint } from 'src/common/constants/constraint.constants';

@Entity()
@Unique(Constraint.UniqueInvoice, ['number', 'type', 'user'])
export class Invoice extends BaseEntity {
    @Column('varchar', { length: 12 })
    number: string;

    @Column('enum', { enum: InvoiceType })
    type: InvoiceType;

    @Column('decimal', { default: '0' })
    amount: string;

    @Column('decimal', { default: '0' })
    prepayment: string;

    @Column('decimal', { default: '0' })
    payment: string;

    @Column('enum', {
        enum: DeliveryStatus,
        default: DeliveryStatus.Processing,
    })
    deliveryStatus: DeliveryStatus;

    @ManyToOne(() => Partner, (partner) => partner.invoices, {
        onDelete: 'CASCADE',
        cascade: true,
        nullable: false,
    })
    @JoinColumn({
        name: 'partnerId',
        referencedColumnName: 'id',
        foreignKeyConstraintName: Constraint.ForeignKeyPartner,
    })
    partner: Partner;

    @OneToMany(() => InvoiceItem, (invoiceItem) => invoiceItem.invoice, {
        cascade: true,
        onDelete: 'RESTRICT',
        nullable: false,
    })
    invoiceItems: InvoiceItem[];

    @OneToOne(() => Invoice, (order) => order.refund, { onDelete: 'CASCADE' })
    @JoinColumn({
        name: 'orderId',
        referencedColumnName: 'id',
        foreignKeyConstraintName: Constraint.ForeignKeyOrder,
    })
    order: Invoice;

    @OneToOne(() => Invoice, (refund) => refund.order)
    refund: Invoice;

    @ManyToOne(() => User, (user) => user.invoices, {
        onDelete: 'CASCADE',
        nullable: false,
    })
    @JoinColumn({
        name: 'userId',
        referencedColumnName: 'id',
        foreignKeyConstraintName: Constraint.ForeignKeyUser,
    })
    user: User;
}
