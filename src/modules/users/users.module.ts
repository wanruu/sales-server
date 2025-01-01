import { Module } from '@nestjs/common';
import { UsersService } from 'src/modules/users/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/modules/users/user.entity';
import { Invoice } from 'src/modules/invoices/invoice.entity';
import { Product } from 'src/modules/products/product.entity';
import { Partner } from 'src/modules/partners/partner.entity';
import { InvoiceItem } from 'src/modules/invoice-items/invoice-item.entity';
import { UsersController } from './users.controller';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            User,
            Invoice,
            Product,
            Partner,
            InvoiceItem,
        ]),
    ],
    controllers: [UsersController],
    providers: [UsersService],
    exports: [UsersService],
})
export class UsersModule {}
