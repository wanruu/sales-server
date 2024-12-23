import { applyDecorators } from '@nestjs/common';
import {
    ApiBadRequestResponse,
    ApiBearerAuth,
    ApiConflictResponse,
    ApiCreatedResponse,
    ApiInternalServerErrorResponse,
    ApiNoContentResponse,
    ApiNotFoundResponse,
    ApiOkResponse,
    ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { CreateOneInvoiceResponseDto } from 'src/dtos/invoice/create-invoice.dto';
import {
    FindManyInvoiceResponseDto,
    FindOneInvoiceResponseDto,
} from 'src/dtos/invoice/find-invoice.dto';
import { UpdateOneInvoiceResponseDto } from 'src/dtos/invoice/update-invoice.dto';

export const CreateOneInvoiceApiResponses = () => {
    return applyDecorators(
        ApiBearerAuth(),
        ApiCreatedResponse({
            description: 'Returns the created invoice.',
            type: CreateOneInvoiceResponseDto,
        }),
        ApiConflictResponse({ description: 'Invoice already exists.' }),
        ApiInternalServerErrorResponse({
            description: 'Internal server error.',
        }),
        ApiUnauthorizedResponse({ description: 'Unauthorized.' }),
        ApiBadRequestResponse({ description: 'Bad request.' }),
    );
};

export const UpdateOneInvoiceApiResponses = () => {
    return applyDecorators(
        ApiBearerAuth(),
        ApiOkResponse({
            description: 'Returns the updated invoice.',
            type: UpdateOneInvoiceResponseDto,
        }),
        ApiConflictResponse({ description: 'Invoice already exists.' }),
        ApiInternalServerErrorResponse({
            description: 'Internal server error.',
        }),
        ApiNotFoundResponse({ description: 'Invoice not found.' }),
        ApiUnauthorizedResponse({ description: 'Unauthorized.' }),
        ApiBadRequestResponse({ description: 'Bad request.' }),
    );
};

export const DeleteOneInvoiceApiResponses = () => {
    return applyDecorators(
        ApiBearerAuth(),
        ApiNoContentResponse({
            description: 'Invoice deleted successfully.',
            content: { 'text/plain': {} },
        }),
        ApiNotFoundResponse({ description: 'Invoice not found.' }),
        ApiInternalServerErrorResponse({
            description: 'Internal server error.',
        }),
        ApiUnauthorizedResponse({ description: 'Unauthorized.' }),
    );
};

export const FindOneInvoiceApiResponses = () => {
    return applyDecorators(
        ApiBearerAuth(),
        ApiOkResponse({
            description: 'Returns the invoice with the given id.',
            type: FindOneInvoiceResponseDto,
        }),
        ApiNotFoundResponse({ description: 'Invoice not found.' }),
        ApiUnauthorizedResponse({ description: 'Unauthorized.' }),
        ApiInternalServerErrorResponse({
            description: 'Internal server error.',
        }),
    );
};

export const FindManyInvoiceApiResponses = () => {
    return applyDecorators(
        ApiBearerAuth(),
        ApiOkResponse({
            description: 'Returns all invoices.',
            isArray: true,
            type: FindManyInvoiceResponseDto,
        }),
        ApiUnauthorizedResponse({ description: 'Unauthorized.' }),
    );
};
