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
import { BaseProductDto } from 'src/dtos/common/base-product.dto';
import { ErrorResponseDto } from 'src/dtos/response/common/error.response.dto';
import { FindManyProductResponseDto } from 'src/dtos/response/product/find-many-product.response.dto';
import { FindOneProductResponseDto } from 'src/dtos/response/product/find-one-product.response.dto';

export const CreateOneProductApiResponses = () => {
    return applyDecorators(
        ApiBearerAuth(),
        ApiCreatedResponse({
            description: 'Returns the created product.',
            schema: {
                properties: {
                    data: {
                        $ref: getSchemaPath(BaseProductDto),
                    },
                },
            },
        }),
        ApiConflictResponse({
            description: 'Product already exists.',
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

export const UpdateOneProductApiResponses = () => {
    return applyDecorators(
        ApiBearerAuth(),
        ApiOkResponse({
            description: 'Returns the updated product.',
            schema: {
                properties: {
                    data: {
                        $ref: getSchemaPath(BaseProductDto),
                    },
                },
            },
        }),
        ApiConflictResponse({
            description: 'Product already exists.',
            type: ErrorResponseDto,
        }),
        ApiInternalServerErrorResponse({
            description: 'Internal server error.',
            type: ErrorResponseDto,
        }),
        ApiNotFoundResponse({
            description: 'Product not found.',
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

export const DeleteOneProductApiResponses = () => {
    return applyDecorators(
        ApiBearerAuth(),
        ApiNoContentResponse({
            description: 'Product deleted successfully.',
            content: { 'text/plain': {} },
        }),
        ApiNotFoundResponse({
            description: 'Product not found.',
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

export const FindOneProductApiResponses = () => {
    return applyDecorators(
        ApiBearerAuth(),
        ApiOkResponse({
            description: 'Returns the product with the given id.',
            schema: {
                properties: {
                    data: {
                        $ref: getSchemaPath(FindOneProductResponseDto),
                    },
                },
            },
        }),
        ApiNotFoundResponse({
            description: 'Product not found.',
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

export const FindManyProductApiResponses = () => {
    return applyDecorators(
        ApiBearerAuth(),
        ApiOkResponse({
            description: 'Returns all products.',
            schema: {
                properties: {
                    data: {
                        type: 'array',
                        items: {
                            $ref: getSchemaPath(FindManyProductResponseDto),
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
