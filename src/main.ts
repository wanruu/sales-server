import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    // class-validator
    app.useGlobalPipes(
        new ValidationPipe({ forbidUnknownValues: true, whitelist: true }),
    );
    // swagger
    const options = new DocumentBuilder()
        .setTitle('API Documentation')
        .setDescription('API documentation for the NestJS application')
        .setVersion('1.0')
        .addBearerAuth()
        .build();
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('api-doc', app, document);

    await app.listen(process.env.PORT);
}
bootstrap();
