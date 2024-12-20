import { Column, Entity, ManyToOne } from 'typeorm';
import { Product } from 'src/entities/product.entity';
import { Invoice } from 'src/entities/invoice.entity';
import { BaseEntity } from 'src/entities/base.entity';
import { User } from 'src/entities/user.entity';

@Entity()
export class InvoiceItem extends BaseEntity {
    @Column('decimal', { default: 0 })
    price: number;

    @Column('decimal', { default: 0 })
    quantity: number;

    @Column('decimal', { default: 0 })
    originalAmount: number;

    @Column('integer', { default: 100 })
    discount: number;

    @Column('decimal', { default: 0 })
    amount: number;

    @Column('decimal', { nullable: true })
    weight: number;

    @Column('text', { nullable: true })
    remark: string;

    @Column('boolean', { default: false })
    delivered: boolean;

    @ManyToOne(() => Product, (product) => product.invoiceItems, {
        onDelete: 'RESTRICT',
        nullable: false,
    })
    product: Product;

    @ManyToOne(() => Invoice, (invoice) => invoice.invoiceItems, {
        onDelete: 'CASCADE',
        nullable: true,
    })
    invoice: Invoice;

    @ManyToOne(() => User, (user) => user.invoiceItems, {
        onDelete: 'CASCADE',
        nullable: false,
    })
    user: User;
}
