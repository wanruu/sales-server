import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './modules/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { ProductsModule } from './modules/products/products.module';
import { PartnersModule } from './modules/partners/partners.module';
import { InvoiceItemsModule } from './modules/invoice-items/invoice-items.module';
import { InvoiceModule } from './modules/invoices/invoice.module';

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
            port: parseInt(process.env.DB_PORT),
            autoLoadEntities: true,
            password: process.env.DB_PASSWORD,
            username: process.env.DB_USERNAME,
            database: process.env.DB_NAME,
            synchronize: true,
            // logging: true,
        }),
        UsersModule,
        ProductsModule,
        PartnersModule,
        InvoiceItemsModule,
        InvoiceModule,
    ],
})
export class AppModule {}
