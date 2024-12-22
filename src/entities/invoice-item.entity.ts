import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Product } from 'src/entities/product.entity';
import { Invoice } from 'src/entities/invoice.entity';
import { BaseEntity, DecimalColumnTransformer } from 'src/entities/base.entity';
import { User } from 'src/entities/user.entity';

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
        transformer: new DecimalColumnTransformer(), // TODO: try null data
    })
    weight: number;

    @Column('text', { nullable: true })
    remark: string;

    @Column('boolean', { default: false })
    delivered: boolean;

    @ManyToOne(() => Product, (product) => product.invoiceItems, {
        onDelete: 'RESTRICT',
        nullable: false,
    })
    @JoinColumn({
        name: 'productId',
        referencedColumnName: 'id',
        foreignKeyConstraintName: 'fk_invoice_item_product',
    })
    product: Product;

    @ManyToOne(() => Invoice, (invoice) => invoice.invoiceItems, {
        onDelete: 'CASCADE',
        nullable: true,
    })
    @JoinColumn({
        name: 'invoiceId',
        referencedColumnName: 'id',
        foreignKeyConstraintName: 'fk_invoice_item_invoice',
    })
    invoice: Invoice;

    @ManyToOne(() => User, (user) => user.invoiceItems, {
        onDelete: 'CASCADE',
        nullable: false,
    })
    @JoinColumn({
        name: 'userId',
        referencedColumnName: 'id',
        foreignKeyConstraintName: 'fk_invoice_item_user',
    })
    user: User;
}
