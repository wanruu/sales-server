import { applyDecorators } from '@nestjs/common';
import {
    ApiConflictResponse,
    ApiCreatedResponse,
    ApiNoContentResponse,
    ApiNotFoundResponse,
    ApiOkResponse,
    getSchemaPath,
} from '@nestjs/swagger';
import { ErrorResponseDto } from 'src/dtos/response/common/error.response.dto';
import { CreateOneInvoiceResponseDto } from 'src/dtos/response/invoice/create-one-invoice.response.dto';
import { FindManyInvoiceResponseDto } from 'src/dtos/response/invoice/find-many-invoice.response.dto';
import { FindOneInvoiceResponseDto } from 'src/dtos/response/invoice/find-one-invoice.response.dto';
import { CommonApiResponses } from './common.api-response.decorator';

export const CreateOneInvoiceApiResponses = () => {
    return applyDecorators(
        CommonApiResponses(),
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
        ApiNotFoundResponse({
            description: 'Partner, product, order or order item not found.',
            type: ErrorResponseDto,
        }),
    );
};

export const ReplaceOneInvoiceApiResponses = () => {
    return applyDecorators(
        CommonApiResponses(),
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
        ApiNotFoundResponse({
            description: 'Partner, product, invoice or order item not found.',
            type: ErrorResponseDto,
        }),
    );
};

export const DeleteOneInvoiceApiResponses = () => {
    return applyDecorators(
        CommonApiResponses(),
        ApiNoContentResponse({
            description: 'Invoice deleted successfully.',
            content: { 'text/plain': {} },
        }),
        ApiNotFoundResponse({
            description: 'Invoice not found.',
            type: ErrorResponseDto,
        }),
    );
};

export const FindOneInvoiceApiResponses = () => {
    return applyDecorators(
        CommonApiResponses(),
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
    );
};

export const FindManyInvoiceApiResponses = () => {
    return applyDecorators(
        CommonApiResponses(),
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
    );
};
