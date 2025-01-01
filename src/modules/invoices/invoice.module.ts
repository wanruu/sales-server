import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InvoiceItem } from 'src/modules/invoice-items/invoice-item.entity';
import { User } from 'src/modules/users/user.entity';
import { Invoice } from 'src/modules/invoices/invoice.entity';
import { Partner } from 'src/modules/partners/partner.entity';
import { InvoicesController } from 'src/modules/invoices/invoices.controller';
import { InvoicesService } from 'src/modules/invoices/invoices.service';

@Module({
    imports: [TypeOrmModule.forFeature([Invoice, InvoiceItem, User, Partner])],
    controllers: [InvoicesController],
    providers: [InvoicesService],
    exports: [InvoicesService],
})
export class InvoiceModule {}
