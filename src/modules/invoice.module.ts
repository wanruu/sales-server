import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InvoiceItem } from 'src/entities/invoice-item.entity';
import { User } from 'src/entities/user.entity';
import { Invoice } from 'src/entities/invoice.entity';
import { Partner } from 'src/entities/partner.entity';
import { InvoicesController } from 'src/controllers/invoices.controller';
import { InvoicesService } from 'src/services/invoices.service';

@Module({
    imports: [TypeOrmModule.forFeature([Invoice, InvoiceItem, User, Partner])],
    controllers: [InvoicesController],
    providers: [InvoicesService],
    exports: [InvoicesService],
})
export class InvoiceModule {}
