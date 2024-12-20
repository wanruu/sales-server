import { BaseEntity } from 'src/entities/base.entity';
import { InvoiceItem } from 'src/entities/invoice-item.entity';
import { User } from 'src/entities/user.entity';
import { Column, Entity, ManyToOne, OneToMany, Unique } from 'typeorm';

@Entity()
@Unique('user product unique', ['material', 'name', 'spec', 'user'])
export class Product extends BaseEntity {
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

    @ManyToOne(() => User, (user) => user.products, {
        onDelete: 'CASCADE',
        nullable: false,
    })
    user: User;

    @OneToMany(() => InvoiceItem, (invoiceItem) => invoiceItem.product)
    invoiceItems: InvoiceItem[];
}
