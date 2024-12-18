import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { ProductModule } from './products/products.module';
import { PartnerModule } from './partners/partners.module';
import { User } from './users/entity/user.entity';
import { Product } from './products/entity/product.entity';
import { Partner } from './partners/entity/partner.entity';
import { InvoiceItem } from './invoices/entity/invoice-item.entity';
import { Invoice } from './invoices/entity/invoice.entity';

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
        JwtModule.register({
            global: true,
            secret: process.env.JWT_SECRET,
            signOptions: { expiresIn: '24h' },
        }),
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: process.env.DB_HOST,
            port: 5432,
            // entities: [__dirname, 'src/**/*.entity.ts'],
            autoLoadEntities: true,
            // entities: [User, Product, Partner, InvoiceItem, Invoice],
            password: process.env.DB_PASSWORD,
            username: process.env.DB_USERNAME,
            database: process.env.DB_NAME,
            synchronize: true,
            logging: true,
        }),
        UserModule,
        ProductModule,
        PartnerModule,
    ],
})
export class AppModule {}
