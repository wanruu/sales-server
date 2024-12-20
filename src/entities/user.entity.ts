import { Column, Entity, OneToMany } from 'typeorm';
import { Partner } from 'src/entities/partner.entity';
import { Product } from 'src/entities/product.entity';
import { Invoice } from 'src/entities/invoice.entity';
import { BaseEntity } from 'src/entities/base.entity';
import { InvoiceItem } from 'src/entities/invoice-item.entity';

@Entity()
export class User extends BaseEntity {
    @Column({ type: 'varchar', length: 35, unique: true })
    name: string;

    @Column({ type: 'text', select: false })
    password: string;

    @OneToMany(() => Partner, (partner) => partner.user)
    partners: Partner[];

    @OneToMany(() => Product, (product) => product.user)
    products: Product[];

    @OneToMany(() => Invoice, (invoice) => invoice.user)
    invoices: Invoice[];

    @OneToMany(() => InvoiceItem, (invoiceItem) => invoiceItem.user)
    invoiceItems: InvoiceItem[];
}
