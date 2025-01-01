import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InvoiceItem } from 'src/modules/invoice-items/invoice-item.entity';
import { InvoiceItemsController } from 'src/modules/invoice-items/invoice-items.controller';
import { InvoiceItemsService } from 'src/modules/invoice-items/invoice-items.service';
import { User } from 'src/modules/users/user.entity';
import { Product } from 'src/modules/products/product.entity';
import { Invoice } from 'src/modules/invoices/invoice.entity';

@Module({
    imports: [TypeOrmModule.forFeature([InvoiceItem, User, Product, Invoice])],
    controllers: [InvoiceItemsController],
    providers: [InvoiceItemsService],
    exports: [InvoiceItemsService],
})
export class InvoiceItemsModule {}
