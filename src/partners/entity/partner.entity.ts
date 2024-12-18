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
import { User } from 'src/users/entity/user.entity';
import { Invoice } from 'src/invoices/entity/invoice.entity';

@Entity()
@Unique(['name', 'user'])
export class Partner {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('varchar')
    name: string;

    @Column('varchar', { length: 20, nullable: true })
    phone: string;

    @Column('varchar', { nullable: true })
    address: string;

    @Column('varchar', { nullable: true })
    folder: string;

    @ManyToOne(() => User, (user) => user.partners)
    user: User;

    @OneToMany(() => Invoice, (invoice) => invoice.partner)
    invoices: Invoice[];

    @BeforeInsert()
    @BeforeUpdate()
    trimFields() {
        this.name = this.name ? this.name.trim() : this.name;
        this.phone = this.phone ? this.phone.trim() : this.phone;
        this.address = this.address ? this.address.trim() : this.address;
        this.folder = this.folder ? this.folder.trim() : this.folder;
    }
}
