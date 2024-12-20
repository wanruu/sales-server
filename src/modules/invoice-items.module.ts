import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InvoiceItem } from 'src/entities/invoice-item.entity';
import { InvoiceItemsController } from 'src/controllers/invoice-items.controller';
import { InvoiceItemsService } from 'src/services/invoice-items.service';
import { User } from 'src/entities/user.entity';
import { Product } from 'src/entities/product.entity';
import { Invoice } from 'src/entities/invoice.entity';

@Module({
    imports: [TypeOrmModule.forFeature([InvoiceItem, User, Product, Invoice])],
    controllers: [InvoiceItemsController],
    providers: [InvoiceItemsService],
    exports: [InvoiceItemsService],
})
export class InvoiceItemsModule {}
