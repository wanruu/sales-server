import { applyDecorators } from '@nestjs/common';
import {
    ApiCreatedResponse,
    ApiNoContentResponse,
    ApiNotFoundResponse,
    ApiOkResponse,
    getSchemaPath,
} from '@nestjs/swagger';
import { BaseInvoiceItemDto } from 'src/dtos/common/base-invoice-item.dto';
import { ErrorResponseDto } from 'src/dtos/response/common/error.response.dto';
import { FindManyInvoiceItemResponseDto } from 'src/dtos/response/invoice-item/find-many-invoice-item.response.dto';
import { CommonApiResponses } from './common.api-response.decorator';
import { FindOneInvoiceItemResponseDto } from 'src/dtos/response/invoice-item/find-one-invoice-item.response.dto';

export const CreateOneInvoiceItemApiResponses = () => {
    return applyDecorators(
        CommonApiResponses(),
        ApiCreatedResponse({
            description: 'Returns the created invoice item.',
            schema: {
                properties: {
                    data: { $ref: getSchemaPath(BaseInvoiceItemDto) },
                },
            },
        }),
    );
};

export const UpdateOneInvoiceItemApiResponses = () => {
    return applyDecorators(
        CommonApiResponses(),
        ApiOkResponse({
            description: 'Returns the updated invoice item.',
            schema: {
                properties: {
                    data: { $ref: getSchemaPath(BaseInvoiceItemDto) },
                },
            },
        }),
        ApiNotFoundResponse({
            description: 'Invoice item not found.',
            type: ErrorResponseDto,
        }),
    );
};

export const DeleteOneInvoiceItemApiResponses = () => {
    return applyDecorators(
        CommonApiResponses(),
        ApiNoContentResponse({
            description: 'Invoice item deleted successfully.',
            content: { 'text/plain': {} },
        }),
        ApiNotFoundResponse({
            description: 'Invoice item not found.',
            type: ErrorResponseDto,
        }),
    );
};

export const FindOneInvoiceItemApiResponse = () => {
    return applyDecorators(
        CommonApiResponses(),
        ApiOkResponse({
            description: 'Returns the invoice item with the given id.',
            schema: {
                properties: {
                    data: {
                        $ref: getSchemaPath(FindOneInvoiceItemResponseDto),
                    },
                },
            },
        }),
        ApiNotFoundResponse({
            description: 'Invoice item not found.',
            type: ErrorResponseDto,
        }),
    );
};

export const FindManyInvoiceItemApiResponses = () => {
    return applyDecorators(
        CommonApiResponses(),
        ApiOkResponse({
            description: 'Returns all invoice items.',
            schema: {
                properties: {
                    data: {
                        type: 'array',
                        items: {
                            $ref: getSchemaPath(FindManyInvoiceItemResponseDto),
                        },
                    },
                    meta: { type: 'object' },
                },
            },
        }),
    );
};
