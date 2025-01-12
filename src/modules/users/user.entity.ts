import { Column, Entity, OneToMany, Unique } from 'typeorm';
import { Partner } from 'src/modules/partners/partner.entity';
import { Product } from 'src/modules/products/product.entity';
import { Invoice } from 'src/modules/invoices/invoice.entity';
import { BaseEntity } from 'src/common/entities/base.entity';
import { InvoiceItem } from 'src/modules/invoice-items/invoice-item.entity';
import { Constraint } from 'src/common/constants/constraint.constants';
@Entity()
@Unique(Constraint.UniqueUser, ['name'])
export class User extends BaseEntity {
    @Column({ type: 'varchar', length: 35 })
    name: string;

    @Column({ type: 'text' })
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
