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
import { BaseEntity, DecimalColumnTransformer } from 'src/entities/base.entity';
import { DeliveryStatus, InvoiceType } from 'src/constants/invoice.constant';
import { Constraint } from 'src/constants/constraint.constant';

@Entity()
@Unique(Constraint.UniqueInvoice, ['number', 'type', 'user'])
export class Invoice extends BaseEntity {
    @Column('varchar', { length: 12 })
    number: string;

    @Column('enum', { enum: InvoiceType })
    type: InvoiceType;

    @Column('decimal', {
        default: 0,
        transformer: new DecimalColumnTransformer(),
    })
    amount: number;

    @Column('decimal', {
        default: 0,
        transformer: new DecimalColumnTransformer(),
    })
    prepayment: number;

    @Column('decimal', {
        default: 0,
        transformer: new DecimalColumnTransformer(),
    })
    payment: number;

    @Column('enum', {
        enum: DeliveryStatus,
        default: DeliveryStatus.NotDelivered,
    })
    delivered: DeliveryStatus;

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
