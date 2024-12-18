import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from 'src/products/entity/product.entity';
import { Invoice } from './invoice.entity';

@Entity()
export class InvoiceItem {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Product, (product) => product.invoiceItems, {
        onDelete: 'RESTRICT',
    })
    product: Product;

    @Column('decimal', { default: 0 })
    price: number;

    @Column('decimal', { default: 0 })
    quantity: number;

    @Column('decimal', { default: 0 }) // TODO: default as amount
    originalAmount: number;

    @Column('integer', { default: 100 })
    discount: number;

    @Column('decimal', { default: 0 })
    amount: number;

    @Column('decimal', { nullable: true })
    weight: number;

    @Column('varchar', { nullable: true })
    remark: string;

    @Column('boolean', { default: false })
    delivered: boolean;

    @ManyToOne(() => Invoice, (invoice) => invoice.invoiceItems, {
        onDelete: 'CASCADE',
    })
    invoice: Invoice;
}
