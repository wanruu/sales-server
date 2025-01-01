import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsController } from 'src/modules/products/products.controller';
import { ProductsService } from 'src/modules/products/products.service';
import { Product } from 'src/modules/products/product.entity';
import { InvoiceItem } from 'src/modules/invoice-items/invoice-item.entity';
import { User } from 'src/modules/users/user.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Product, InvoiceItem, User])],
    controllers: [ProductsController],
    providers: [ProductsService],
    exports: [ProductsService],
})
export class ProductsModule {}
