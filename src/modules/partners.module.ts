import { Module } from '@nestjs/common';
import { PartnersController } from 'src/controllers/partners.controller';
import { PartnersService } from 'src/services/partners.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Partner } from 'src/entities/partner.entity';
import { User } from 'src/entities/user.entity';
import { Invoice } from 'src/entities/invoice.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Partner, User, Invoice])],
    controllers: [PartnersController],
    providers: [PartnersService],
    exports: [PartnersService],
})
export class PartnersModule {}
