import { Constraint } from 'src/constants/constraint.constant';
import { BaseEntity, DecimalColumnTransformer } from 'src/entities/base.entity';
import { InvoiceItem } from 'src/entities/invoice-item.entity';
import { User } from 'src/entities/user.entity';
import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    Unique,
} from 'typeorm';

@Entity()
@Unique(Constraint.UniqueProduct, ['material', 'name', 'spec', 'user'])
export class Product extends BaseEntity {
    @Column('varchar', { length: 30, default: '' })
    material: string;

    @Column('varchar', { length: 40 })
    name: string;

    @Column('varchar', { length: 30 })
    spec: string;

    @Column('varchar', { length: 10 })
    unit: string;

    @Column('decimal', {
        default: 0,
        transformer: new DecimalColumnTransformer(),
    })
    quantity: number;

    @ManyToOne(() => User, (user) => user.products, {
        onDelete: 'CASCADE',
        nullable: false,
    })
    @JoinColumn({
        name: 'userId',
        referencedColumnName: 'id',
        foreignKeyConstraintName: Constraint.ForeignKeyUser,
    })
    user: User;

    @OneToMany(() => InvoiceItem, (invoiceItem) => invoiceItem.product)
    invoiceItems: InvoiceItem[];
}
