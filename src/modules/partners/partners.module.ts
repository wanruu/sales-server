import { Module } from '@nestjs/common';
import { PartnersController } from 'src/modules/partners/partners.controller';
import { PartnersService } from 'src/modules/partners/partners.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Partner } from 'src/modules/partners/partner.entity';
import { User } from 'src/modules/users/user.entity';
import { Invoice } from 'src/modules/invoices/invoice.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Partner, User, Invoice])],
    controllers: [PartnersController],
    providers: [PartnersService],
    exports: [PartnersService],
})
export class PartnersModule {}
