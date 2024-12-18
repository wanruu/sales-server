import {
    Column,
    Entity,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    Unique,
} from 'typeorm';
import { User } from 'src/users/entity/user.entity';
import { Invoice } from 'src/invoices/entity/invoice.entity';
import { BaseEntity } from 'src/base/base.entity';

@Entity()
@Unique(['name', 'user'])
export class Partner extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('varchar', { length: 100 })
    name: string;

    @Column('varchar', { length: 20, nullable: true })
    phone: string;

    @Column('text', { nullable: true })
    address: string;

    @Column('text', { nullable: true })
    folder: string;

    @ManyToOne(() => User, (user) => user.partners, { onDelete: 'CASCADE' })
    user: User;

    @OneToMany(() => Invoice, (invoice) => invoice.partner)
    invoices: Invoice[];
}
