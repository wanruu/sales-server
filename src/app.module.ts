import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { ProductModule } from './products/products.module';

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
        JwtModule.register({
            global: true,
            secret: process.env.JWT_SECRET,
            signOptions: { expiresIn: '24h' },
        }),
        MongooseModule.forRoot(
            `mongodb://${process.env.MONGO_DOMAIN || 'localhost'}:27017`,
            {
                user: process.env.MONGO_USERNAME,
                pass: process.env.MONGO_PASSWORD,
                dbName: process.env.MONGO_DB_NAME || 'sales',
            },
        ),
        UserModule,
        ProductModule,
    ],
})
export class AppModule {}
