import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';
import { Product } from 'src/modules/products/product.entity';
import { Invoice } from 'src/modules/invoices/invoice.entity';
import { BaseEntity } from 'src/common/entities/base.entity';
import { DecimalColumnTransformer } from 'src/common/transformers/decimal-column.transformer';
import { User } from 'src/modules/users/user.entity';
import { Constraint } from 'src/common/constants/constraint.constants';

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
