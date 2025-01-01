import { Constraint } from 'src/common/constants/constraint.constants';
import { BaseEntity } from 'src/common/entities/base.entity';
import { DecimalColumnTransformer } from 'src/common/transformers/decimal-column.transformer';
import { InvoiceItem } from 'src/modules/invoice-items/invoice-item.entity';
import { User } from 'src/modules/users/user.entity';
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
