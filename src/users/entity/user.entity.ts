import {
    BeforeInsert,
    BeforeUpdate,
    Column,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { Partner } from 'src/partners/entity/partner.entity';
import { Product } from 'src/products/entity/product.entity';
import { Invoice } from 'src/invoices/entity/invoice.entity';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 15, unique: true })
    name: string;

    @Column({ type: 'varchar' })
    password: string;

    @OneToMany(() => Partner, (partner) => partner.user)
    partners: Partner[];

    @OneToMany(() => Product, (product) => product.user)
    products: Product[];

    @OneToMany(() => Invoice, (invoice) => invoice.user)
    invoices: Invoice[];

    @BeforeInsert()
    @BeforeUpdate()
    trimFields() {
        this.name = this.name ? this.name.trim() : this.name;
    }
}
