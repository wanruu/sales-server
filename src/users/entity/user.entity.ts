import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Partner } from 'src/partners/entity/partner.entity';
import { Product } from 'src/products/entity/product.entity';
import { Invoice } from 'src/invoices/entity/invoice.entity';
import { BaseEntity } from 'src/base/base.entity';

@Entity()
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'text', unique: true })
    // TODO: length constraint
    name: string;

    @Column({ type: 'text', select: false })
    // TODO: length constraint
    password: string;

    @OneToMany(() => Partner, (partner) => partner.user)
    partners: Partner[];

    @OneToMany(() => Product, (product) => product.user)
    products: Product[];

    @OneToMany(() => Invoice, (invoice) => invoice.user)
    invoices: Invoice[];
}
