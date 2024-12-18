import { InvoiceItem } from 'src/invoices/entity/invoice-item.entity';
import { User } from 'src/users/entity/user.entity';
import {
    BeforeInsert,
    BeforeUpdate,
    Column,
    Entity,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    Unique,
} from 'typeorm';

@Entity()
@Unique(['material', 'name', 'spec', 'user'])
export class Product {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('varchar', { nullable: true })
    material: string;

    @Column('varchar')
    name: string;

    @Column('varchar')
    spec: string;

    @Column('varchar')
    unit: string;

    // @Column('decimal', { default: 0 })
    // quantity: Number;

    @ManyToOne(() => User, (user) => user.products)
    user: User;

    @OneToMany(() => InvoiceItem, (invoiceItem) => invoiceItem.product)
    invoiceItems: InvoiceItem[];

    @BeforeInsert()
    @BeforeUpdate()
    trimFields() {
        this.material = this.material ? this.material.trim() : this.material;
        this.name = this.name ? this.name.trim() : this.name;
        this.spec = this.spec ? this.spec.trim() : this.spec;
        this.unit = this.unit ? this.unit.trim() : this.unit;
    }
}
