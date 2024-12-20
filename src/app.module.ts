import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './modules/users.module';
import { JwtModule } from '@nestjs/jwt';
import { ProductsModule } from './modules/products.module';
import { PartnersModule } from './modules/partners.module';
import { InvoiceItemsModule } from './modules/invoice-items.module';

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
            autoLoadEntities: true,
            password: process.env.DB_PASSWORD,
            username: process.env.DB_USERNAME,
            database: process.env.DB_NAME,
            synchronize: true,
            logging: true,
        }),
        UsersModule,
        ProductsModule,
        PartnersModule,
        InvoiceItemsModule,
    ],
})
export class AppModule {}
