import { BaseEntity } from 'src/base/base.entity';
import { InvoiceItem } from 'src/invoices/entity/invoice-item.entity';
import { User } from 'src/users/entity/user.entity';
import {
    Column,
    Entity,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    Unique,
} from 'typeorm';

@Entity()
@Unique(['material', 'name', 'spec', 'user'])
export class Product extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('varchar', { length: 30, nullable: true })
    material: string;

    @Column('varchar', { length: 40 })
    name: string;

    @Column('varchar', { length: 30 })
    spec: string;

    @Column('varchar', { length: 10 })
    unit: string;

    @Column('decimal', { default: 0 })
    quantity: number;

    @ManyToOne(() => User, (user) => user.products, { onDelete: 'CASCADE' })
    user: User;

    @OneToMany(() => InvoiceItem, (invoiceItem) => invoiceItem.product)
    invoiceItems: InvoiceItem[];
}
