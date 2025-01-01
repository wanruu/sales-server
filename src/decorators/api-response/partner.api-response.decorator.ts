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
import { BasePartnerDto } from 'src/dtos/common/base-partner.dto';
import { ErrorResponseDto } from 'src/dtos/response/common/error.response.dto';
import { FindManyPartnerResponseDto } from 'src/dtos/response/partner/find-many-partner.response.dto';
import { FindOnePartnerResponseDto } from 'src/dtos/response/partner/find-one-partner.response.dto';

export const CreateOnePartnerApiResponses = () => {
    return applyDecorators(
        ApiBearerAuth(),
        ApiCreatedResponse({
            description: 'Returns the created partner.',
            schema: {
                properties: {
                    data: {
                        $ref: getSchemaPath(BasePartnerDto),
                    },
                },
            },
        }),
        ApiConflictResponse({
            description: 'Partner already exists.',
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

export const UpdateOnePartnerApiResponses = () => {
    return applyDecorators(
        ApiBearerAuth(),
        ApiOkResponse({
            description: 'Returns the updated partner.',
            schema: {
                properties: {
                    data: {
                        $ref: getSchemaPath(BasePartnerDto),
                    },
                },
            },
        }),
        ApiConflictResponse({
            description: 'Partner already exists.',
            type: ErrorResponseDto,
        }),
        ApiInternalServerErrorResponse({
            description: 'Internal server error.',
            type: ErrorResponseDto,
        }),
        ApiNotFoundResponse({
            description: 'Partner not found.',
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

export const DeleteOnePartnerApiResponses = () => {
    return applyDecorators(
        ApiBearerAuth(),
        ApiNoContentResponse({
            description: 'Partner deleted successfully.',
            content: { 'text/plain': {} },
        }),
        ApiNotFoundResponse({
            description: 'Partner not found.',
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

export const FindOnePartnerApiResponses = () => {
    return applyDecorators(
        ApiBearerAuth(),
        ApiOkResponse({
            description: 'Returns the partner with the given id.',
            schema: {
                properties: {
                    data: {
                        $ref: getSchemaPath(FindOnePartnerResponseDto),
                    },
                },
            },
        }),
        ApiNotFoundResponse({
            description: 'Partner not found.',
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

export const FindManyPartnerApiResponses = () => {
    return applyDecorators(
        ApiBearerAuth(),
        ApiOkResponse({
            description: 'Returns all partners.',
            schema: {
                properties: {
                    data: {
                        type: 'array',
                        items: {
                            $ref: getSchemaPath(FindManyPartnerResponseDto),
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
