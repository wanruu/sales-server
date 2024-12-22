import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';
import { Product } from 'src/entities/product.entity';
import { Invoice } from 'src/entities/invoice.entity';
import { BaseEntity, DecimalColumnTransformer } from 'src/entities/base.entity';
import { User } from 'src/entities/user.entity';
import { Constraint } from 'src/constants/constraint.constant';

@Entity()
export class InvoiceItem extends BaseEntity {
    @Column('decimal', {
        default: 0,
        transformer: new DecimalColumnTransformer(),
    })
    price: number;

    @Column('decimal', {
        default: 0,
        transformer: new DecimalColumnTransformer(),
    })
    quantity: number;

    @Column('decimal', {
        default: 0,
        transformer: new DecimalColumnTransformer(),
    })
    originalAmount: number;

    @Column('integer', { default: 100 })
    discount: number;

    @Column('decimal', {
        default: 0,
        transformer: new DecimalColumnTransformer(),
    })
    amount: number;

    @Column('decimal', {
        nullable: true,
        transformer: new DecimalColumnTransformer(),
    })
    weight: number | null;

    @Column('text', { default: '' })
    remark: string;

    @Column('boolean', { default: false })
    delivered: boolean;

    @ManyToOne(() => Product, (product) => product.invoiceItems, {
        onDelete: 'RESTRICT',
        nullable: false,
        cascade: true,
    })
    @JoinColumn({
        name: 'productId',
        referencedColumnName: 'id',
        foreignKeyConstraintName: Constraint.ForeignKeyProduct,
    })
    product: Product;

    @ManyToOne(() => Invoice, (invoice) => invoice.invoiceItems, {
        onDelete: 'CASCADE',
        orphanedRowAction: 'delete',
    })
    @JoinColumn({
        name: 'invoiceId',
        referencedColumnName: 'id',
        foreignKeyConstraintName: Constraint.ForeignKeyInvoice,
    })
    invoice: Invoice;

    @ManyToOne(() => User, (user) => user.invoiceItems, {
        onDelete: 'CASCADE',
        nullable: false,
    })
    @JoinColumn({
        name: 'userId',
        referencedColumnName: 'id',
        foreignKeyConstraintName: Constraint.ForeignKeyUser,
    })
    user: User;

    @OneToOne(() => InvoiceItem, (orderItem) => orderItem.refundItem, {
        onDelete: 'CASCADE',
    })
    @JoinColumn({
        name: 'orderItemId',
        referencedColumnName: 'id',
        foreignKeyConstraintName: Constraint.ForeignKeyOrderItem,
    })
    orderItem: InvoiceItem;

    @OneToOne(() => InvoiceItem, (refundItem) => refundItem.orderItem)
    refundItem: InvoiceItem;
}
