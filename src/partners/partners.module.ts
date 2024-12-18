import { Module } from '@nestjs/common';
import { PartnerController } from './partners.controller';
import { PartnerService } from './partners.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Partner } from './entity/partner.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Partner])],
    controllers: [PartnerController],
    providers: [PartnerService],
    exports: [PartnerService],
})
export class PartnerModule {}
