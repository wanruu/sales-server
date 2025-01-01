import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    Unique,
} from 'typeorm';
import { User } from 'src/modules/users/user.entity';
import { Invoice } from 'src/modules/invoices/invoice.entity';
import { BaseEntity } from 'src/common/entities/base.entity';
import { Constraint } from 'src/common/constants/constraint.constants';

@Entity()
@Unique(Constraint.UniquePartner, ['name', 'user'])
export class Partner extends BaseEntity {
    @Column('varchar', { length: 100 })
    name: string;

    @Column('varchar', { length: 20, default: '' })
    phone: string;

    @Column('text', { default: '' })
    address: string;

    @Column('text', { default: '' })
    folder: string;

    @ManyToOne(() => User, (user) => user.partners, {
        onDelete: 'CASCADE',
        nullable: false,
    })
    @JoinColumn({
        name: 'userId',
        referencedColumnName: 'id',
        foreignKeyConstraintName: Constraint.ForeignKeyUser,
    })
    user: User;

    @OneToMany(() => Invoice, (invoice) => invoice.partner)
    invoices: Invoice[];
}
