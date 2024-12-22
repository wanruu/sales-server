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
import { BaseProductDto } from 'src/dtos/common/base-product.dto';
import { FindManyProductResponseDto } from 'src/dtos/response/product/find-many-product.response.dto';
import { FindOneProductResponseDto } from 'src/dtos/response/product/find-one-product.response.dto';

export const CreateOneProductApiResponses = () => {
    return applyDecorators(
        ApiBearerAuth(),
        ApiCreatedResponse({
            description: 'Returns the created product.',
            type: BaseProductDto,
        }),
        ApiConflictResponse({ description: 'Product already exists.' }),
        ApiInternalServerErrorResponse({
            description: 'Internal server error.',
        }),
        ApiUnauthorizedResponse({ description: 'Unauthorized.' }),
        ApiBadRequestResponse({ description: 'Bad request.' }),
    );
};

export const UpdateOneProductApiResponses = () => {
    return applyDecorators(
        ApiBearerAuth(),
        ApiOkResponse({
            description: 'Returns the updated product.',
            type: BaseProductDto,
        }),
        ApiConflictResponse({ description: 'Product already exists.' }),
        ApiInternalServerErrorResponse({
            description: 'Internal server error.',
        }),
        ApiNotFoundResponse({ description: 'Product not found.' }),
        ApiUnauthorizedResponse({ description: 'Unauthorized.' }),
        ApiBadRequestResponse({ description: 'Bad request.' }),
    );
};

export const DeleteOneProductApiResponses = () => {
    return applyDecorators(
        ApiBearerAuth(),
        ApiNoContentResponse({
            description: 'Product deleted successfully.',
            content: { 'text/plain': {} },
        }),
        ApiNotFoundResponse({ description: 'Product not found.' }),
        ApiInternalServerErrorResponse({
            description: 'Internal server error.',
        }),
        ApiUnauthorizedResponse({ description: 'Unauthorized.' }),
    );
};

export const FindOneProductApiResponses = () => {
    return applyDecorators(
        ApiBearerAuth(),
        ApiOkResponse({
            description: 'Returns the product with the given id.',
            type: FindOneProductResponseDto,
        }),
        ApiNotFoundResponse({ description: 'Product not found.' }),
        ApiUnauthorizedResponse({ description: 'Unauthorized.' }),
        ApiInternalServerErrorResponse({
            description: 'Internal server error.',
        }),
    );
};

export const FindManyProductApiResponses = () => {
    return applyDecorators(
        ApiBearerAuth(),
        ApiOkResponse({
            description: 'Returns all products.',
            isArray: true,
            type: FindManyProductResponseDto,
        }),
        ApiUnauthorizedResponse({ description: 'Unauthorized.' }),
    );
};
