import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Partner, PartnerSchema } from 'src/schemas/partner.schema';
import { PartnerController } from './partners.controller';
import { PartnerService } from './partners.service';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Partner.name, schema: PartnerSchema },
        ]),
    ],
    controllers: [PartnerController],
    providers: [PartnerService],
    exports: [PartnerService],
})
export class PartnerModule {}
