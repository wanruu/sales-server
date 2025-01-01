import { applyDecorators } from '@nestjs/common';
import {
    ApiConflictResponse,
    ApiCreatedResponse,
    ApiNoContentResponse,
    ApiNotFoundResponse,
    ApiOkResponse,
    getSchemaPath,
} from '@nestjs/swagger';
import { BasePartnerDto } from 'src/dtos/common/base-partner.dto';
import { ErrorResponseDto } from 'src/dtos/response/common/error.response.dto';
import { FindManyPartnerResponseDto } from 'src/dtos/response/partner/find-many-partner.response.dto';
import { FindOnePartnerResponseDto } from 'src/dtos/response/partner/find-one-partner.response.dto';
import { CommonApiResponses } from './common.api-response.decorator';

export const CreateOnePartnerApiResponses = () => {
    return applyDecorators(
        CommonApiResponses(),
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
    );
};

export const UpdateOnePartnerApiResponses = () => {
    return applyDecorators(
        CommonApiResponses(),
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
        ApiNotFoundResponse({
            description: 'Partner not found.',
            type: ErrorResponseDto,
        }),
    );
};

export const DeleteOnePartnerApiResponses = () => {
    return applyDecorators(
        CommonApiResponses(),
        ApiNoContentResponse({
            description: 'Partner deleted successfully.',
            content: { 'text/plain': {} },
        }),
        ApiNotFoundResponse({
            description: 'Partner not found.',
            type: ErrorResponseDto,
        }),
    );
};

export const FindOnePartnerApiResponses = () => {
    return applyDecorators(
        CommonApiResponses(),
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
    );
};

export const FindManyPartnerApiResponses = () => {
    return applyDecorators(
        CommonApiResponses(),
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
    );
};
