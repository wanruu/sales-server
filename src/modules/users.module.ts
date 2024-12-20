import { Module } from '@nestjs/common';
import { UsersController } from '../controllers/users.controller';
import { UsersService } from 'src/services/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Invoice } from 'src/entities/invoice.entity';
import { Product } from 'src/entities/product.entity';
import { Partner } from 'src/entities/partner.entity';
import { InvoiceItem } from 'src/entities/invoice-item.entity';

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
