import { Column, Entity, OneToMany, Unique } from 'typeorm';
import { Partner } from 'src/entities/partner.entity';
import { Product } from 'src/entities/product.entity';
import { Invoice } from 'src/entities/invoice.entity';
import { BaseEntity } from 'src/entities/base.entity';
import { InvoiceItem } from 'src/entities/invoice-item.entity';
import { Constraint } from 'src/constants/constraint.constant';

@Entity()
@Unique(Constraint.UniqueUser, ['name'])
export class User extends BaseEntity {
    @Column({ type: 'varchar', length: 35 })
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
