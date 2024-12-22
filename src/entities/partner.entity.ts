import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    Unique,
} from 'typeorm';
import { User } from 'src/entities/user.entity';
import { Invoice } from 'src/entities/invoice.entity';
import { BaseEntity } from 'src/entities/base.entity';

@Entity()
@Unique('unique_partner', ['name', 'user'])
export class Partner extends BaseEntity {
    @Column('varchar', { length: 100 })
    name: string;

    @Column('varchar', { length: 20, nullable: true })
    phone: string;

    @Column('text', { nullable: true })
    address: string;

    @Column('text', { nullable: true })
    folder: string;

    @ManyToOne(() => User, (user) => user.partners, {
        onDelete: 'CASCADE',
        nullable: false,
    })
    @JoinColumn({
        name: 'userId',
        referencedColumnName: 'id',
        foreignKeyConstraintName: 'fk_partner_user',
    })
    user: User;

    @OneToMany(() => Invoice, (invoice) => invoice.partner)
    invoices: Invoice[];
}
