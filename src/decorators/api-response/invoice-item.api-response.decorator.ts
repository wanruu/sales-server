import { applyDecorators } from '@nestjs/common';
import {
    ApiBearerAuth,
    ApiCreatedResponse,
    ApiInternalServerErrorResponse,
    ApiNoContentResponse,
    ApiNotFoundResponse,
    ApiOkResponse,
    ApiUnauthorizedResponse,
    ApiBadRequestResponse,
    getSchemaPath,
} from '@nestjs/swagger';
import { BaseInvoiceItemDto } from 'src/dtos/common/base-invoice-item.dto';
import { ErrorResponseDto } from 'src/dtos/response/common/error.response.dto';
import { FindManyInvoiceResponseItemDto } from 'src/dtos/response/invoice-item/find-many-invoice-item.response.dto';

export const CreateOneInvoiceItemApiResponses = () => {
    return applyDecorators(
        ApiBearerAuth(),
        ApiCreatedResponse({
            description: 'Returns the created invoice item.',
            schema: {
                properties: {
                    data: { $ref: getSchemaPath(BaseInvoiceItemDto) },
                },
            },
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

export const UpdateOneInvoiceItemApiResponses = () => {
    return applyDecorators(
        ApiBearerAuth(),
        ApiOkResponse({
            description: 'Returns the updated invoice item.',
            schema: {
                properties: {
                    data: { $ref: getSchemaPath(BaseInvoiceItemDto) },
                },
            },
        }),
        ApiInternalServerErrorResponse({
            description: 'Internal server error.',
            type: ErrorResponseDto,
        }),
        ApiNotFoundResponse({
            description: 'Invoice item not found.',
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

export const DeleteOneInvoiceItemApiResponses = () => {
    return applyDecorators(
        ApiBearerAuth(),
        ApiNoContentResponse({
            description: 'Invoice item deleted successfully.',
            content: { 'text/plain': {} },
        }),
        ApiNotFoundResponse({
            description: 'Invoice item not found.',
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

export const FindManyInvoiceItemApiResponses = () => {
    return applyDecorators(
        ApiBearerAuth(),
        ApiOkResponse({
            description: 'Returns all invoice items.',
            schema: {
                properties: {
                    data: {
                        type: 'array',
                        items: {
                            $ref: getSchemaPath(FindManyInvoiceResponseItemDto),
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
