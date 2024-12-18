import { Module } from '@nestjs/common';
import { UserController } from './users.controller';
import { UserService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { Invoice } from 'src/invoices/entity/invoice.entity';
import { Product } from 'src/products/entity/product.entity';
import { Partner } from 'src/partners/entity/partner.entity';

@Module({
    imports: [TypeOrmModule.forFeature([User, Invoice, Product, Partner])],
    controllers: [UserController],
    providers: [UserService],
    exports: [UserService],
})
export class UserModule {}
