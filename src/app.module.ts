import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './users/users.module';

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
        MongooseModule.forRoot(
            `mongodb://${process.env.MONGO_DOMAIN || 'localhost'}:27017`,
            {
                user: process.env.MONGO_USERNAME,
                pass: process.env.MONGO_PASSWORD,
            },
        ),
        UserModule,
    ],
})
export class AppModule {}
