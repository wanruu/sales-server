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
    getSchemaPath,
} from '@nestjs/swagger';
import { ErrorResponseDto } from 'src/dtos/response/common/error.response.dto';
import { CreateOneInvoiceResponseDto } from 'src/dtos/response/invoice/create-one-invoice.response.dto';
import { FindManyInvoiceResponseDto } from 'src/dtos/response/invoice/find-many-invoice.response.dto';
import { FindOneInvoiceResponseDto } from 'src/dtos/response/invoice/find-one-invoice.response.dto';

export const CreateOneInvoiceApiResponses = () => {
    return applyDecorators(
        ApiBearerAuth(),
        ApiCreatedResponse({
            description: 'Returns the created invoice.',
            schema: {
                properties: {
                    data: {
                        $ref: getSchemaPath(CreateOneInvoiceResponseDto),
                    },
                },
            },
        }),
        ApiConflictResponse({
            description: 'Invoice already exists.',
            type: ErrorResponseDto,
        }),
        ApiInternalServerErrorResponse({
            description: 'Internal server error.',
            type: ErrorResponseDto,
        }),
        ApiUnauthorizedResponse({
            description: 'Unauthorized.',
            type: ErrorResponseDto,
        }),
        ApiBadRequestResponse({
            description: 'Bad request.',
            type: ErrorResponseDto,
        }),
    );
};

export const ReplaceOneInvoiceApiResponses = () => {
    return applyDecorators(
        ApiBearerAuth(),
        ApiOkResponse({
            description: 'Returns the replaced invoice.',
            schema: {
                properties: {
                    data: {
                        $ref: getSchemaPath(CreateOneInvoiceResponseDto),
                    },
                },
            },
        }),
        ApiConflictResponse({
            description: 'Invoice already exists.',
            type: ErrorResponseDto,
        }),
        ApiInternalServerErrorResponse({
            description: 'Internal server error.',
            type: ErrorResponseDto,
        }),
        ApiNotFoundResponse({
            description: 'Invoice not found.',
            type: ErrorResponseDto,
        }),
        ApiUnauthorizedResponse({
            description: 'Unauthorized.',
            type: ErrorResponseDto,
        }),
        ApiBadRequestResponse({
            description: 'Bad request.',
            type: ErrorResponseDto,
        }),
    );
};

export const DeleteOneInvoiceApiResponses = () => {
    return applyDecorators(
        ApiBearerAuth(),
        ApiNoContentResponse({
            description: 'Invoice deleted successfully.',
            content: { 'text/plain': {} },
        }),
        ApiNotFoundResponse({
            description: 'Invoice not found.',
            type: ErrorResponseDto,
        }),
        ApiInternalServerErrorResponse({
            description: 'Internal server error.',
            type: ErrorResponseDto,
        }),
        ApiUnauthorizedResponse({
            description: 'Unauthorized.',
            type: ErrorResponseDto,
        }),
    );
};

export const FindOneInvoiceApiResponses = () => {
    return applyDecorators(
        ApiBearerAuth(),
        ApiOkResponse({
            description: 'Returns the invoice with the given id.',
            schema: {
                properties: {
                    data: {
                        $ref: getSchemaPath(FindOneInvoiceResponseDto),
                    },
                },
            },
        }),
        ApiNotFoundResponse({
            description: 'Invoice not found.',
            type: ErrorResponseDto,
        }),
        ApiUnauthorizedResponse({
            description: 'Unauthorized.',
            type: ErrorResponseDto,
        }),
        ApiInternalServerErrorResponse({
            description: 'Internal server error.',
            type: ErrorResponseDto,
        }),
    );
};

export const FindManyInvoiceApiResponses = () => {
    return applyDecorators(
        ApiBearerAuth(),
        ApiOkResponse({
            description: 'Returns all invoices.',
            schema: {
                properties: {
                    data: {
                        type: 'array',
                        items: {
                            $ref: getSchemaPath(FindManyInvoiceResponseDto),
                        },
                    },
                    meta: { type: 'object' },
                },
            },
        }),
        ApiUnauthorizedResponse({
            description: 'Unauthorized.',
            type: ErrorResponseDto,
        }),
    );
};
