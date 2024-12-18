import {
    BeforeInsert,
    BeforeUpdate,
    Column,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { Min, Max, IsInt } from 'class-validator';
import { Product } from 'src/products/entity/product.entity';
import { Invoice } from './invoice.entity';

@Entity()
export class InvoiceItem {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Product, (product) => product.invoiceItems)
    product: Product;

    @Column('decimal', { default: 0 })
    @Min(0)
    price: number;

    @Column('decimal', { default: 0 })
    @Min(0)
    quantity: number;

    @Column('decimal', { default: 0 }) // TODO: default as amount
    @Min(0)
    originalAmount: number;

    @Column('integer', { default: 100 })
    @IsInt()
    @Min(0)
    @Max(100)
    discount: number;

    @Column('decimal', { default: 0 })
    @Min(0)
    amount: number;

    @Column('decimal', { nullable: true })
    @Min(0)
    weight: number;

    @Column('varchar', { nullable: true })
    remark: string;

    @Column('boolean', { default: false })
    delivered: boolean;

    @ManyToOne(() => Invoice, (invoice) => invoice.invoiceItems, {
        nullable: true,
    })
    invoice: Invoice;

    @BeforeInsert()
    @BeforeUpdate()
    trimFields() {
        this.remark = this.remark ? this.remark.trim() : this.remark;
    }
}
