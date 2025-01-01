import {
    Catch,
    ArgumentsHost,
    HttpException,
    ConflictException,
    InternalServerErrorException,
    NotFoundException,
} from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { Constraint } from 'src/constants/constraint.constant';
import { QueryFailedError } from 'typeorm';

function getHttpException(error: QueryFailedError): HttpException {
    const constraint: string = (error.driverError as any).constraint;
    switch (constraint) {
        case Constraint.UniqueUser:
            return new ConflictException('Username is already in use.');
        case Constraint.UniqueProduct:
            return new ConflictException('Product already exists.');
        case Constraint.UniqueInvoice:
            return new ConflictException('Invoice already exists.');
        case Constraint.UniquePartner:
            return new ConflictException('Partner already exists.');
        case Constraint.ForeignKeyPartner:
            return new NotFoundException('Partner not found.');
        case Constraint.ForeignKeyProduct:
            return new NotFoundException('Product not found.');
        case Constraint.ForeignKeyInvoice:
            return new NotFoundException('Invoice not found.');
        case Constraint.ForeignKeyOrder:
            return new NotFoundException('Order not found.');
        case Constraint.ForeignKeyUser:
            return new NotFoundException('User not found.');
        case Constraint.ForeignKeyOrderItem:
            return new NotFoundException('Order item not found.');
    }
    return new InternalServerErrorException(error.message);
}

@Catch()
export class AllExceptionsFilter extends BaseExceptionFilter {
    catch(exception: unknown, host: ArgumentsHost) {
        console.error(exception);

        // If exception is an instance of QueryFailedError, handle it accordingly
        if (exception instanceof QueryFailedError) {
            exception = getHttpException(exception);
        }

        // If exception is not an instance of HttpException, handle it as InternalServerErrorException
        if (!(exception instanceof HttpException)) {
            exception = new InternalServerErrorException();
        }

        return this.applicationRef.reply(
            host.switchToHttp().getResponse(),
            (exception as HttpException).getResponse(),
            (exception as HttpException).getStatus(),
        );
    }
}
