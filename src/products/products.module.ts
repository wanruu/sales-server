import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductController } from './products.controller';
import { ProductService } from './products.service';
import { Product } from './entity/product.entity';
import { InvoiceItem } from 'src/invoices/entity/invoice-item.entity';
import { User } from 'src/users/entity/user.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Product, InvoiceItem, User])],
    controllers: [ProductController],
    providers: [ProductService],
    exports: [ProductService],
})
export class ProductModule {}
