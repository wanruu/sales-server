import { applyDecorators } from '@nestjs/common';
import {
    ApiConflictResponse,
    ApiCreatedResponse,
    ApiNoContentResponse,
    ApiNotFoundResponse,
    ApiOkResponse,
    getSchemaPath,
} from '@nestjs/swagger';
import { BaseProductDto } from 'src/dtos/common/base-product.dto';
import { ErrorResponseDto } from 'src/dtos/response/common/error.response.dto';
import { FindManyProductResponseDto } from 'src/dtos/response/product/find-many-product.response.dto';
import { FindOneProductResponseDto } from 'src/dtos/response/product/find-one-product.response.dto';
import { CommonApiResponses } from './common.api-response.decorator';

export const CreateOneProductApiResponses = () => {
    return applyDecorators(
        CommonApiResponses(),
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
    );
};

export const UpdateOneProductApiResponses = () => {
    return applyDecorators(
        CommonApiResponses(),
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
        ApiNotFoundResponse({
            description: 'Product not found.',
            type: ErrorResponseDto,
        }),
    );
};

export const DeleteOneProductApiResponses = () => {
    return applyDecorators(
        CommonApiResponses(),
        ApiNoContentResponse({
            description: 'Product deleted successfully.',
            content: { 'text/plain': {} },
        }),
        ApiNotFoundResponse({
            description: 'Product not found.',
            type: ErrorResponseDto,
        }),
    );
};

export const FindOneProductApiResponses = () => {
    return applyDecorators(
        CommonApiResponses(),
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
    );
};

export const FindManyProductApiResponses = () => {
    return applyDecorators(
        CommonApiResponses(),
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
    );
};
