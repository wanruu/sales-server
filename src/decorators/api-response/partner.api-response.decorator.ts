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
import { BasePartnerDto } from 'src/dtos/common/base-partner.dto';
import { FindManyPartnerResponseDto } from 'src/dtos/response/partner/find-many-partner.response.dto';
import { FindOnePartnerResponseDto } from 'src/dtos/response/partner/find-one-partner.response.dto';

export const CreateOnePartnerApiResponses = () => {
    return applyDecorators(
        ApiBearerAuth(),
        ApiCreatedResponse({
            description: 'Returns the created partner.',
            type: BasePartnerDto,
        }),
        ApiConflictResponse({ description: 'Partner already exists.' }),
        ApiInternalServerErrorResponse({
            description: 'Internal server error.',
        }),
        ApiUnauthorizedResponse({ description: 'Unauthorized.' }),
        ApiBadRequestResponse({ description: 'Bad request.' }),
    );
};

export const UpdateOnePartnerApiResponses = () => {
    return applyDecorators(
        ApiBearerAuth(),
        ApiOkResponse({
            description: 'Returns the updated partner.',
            type: BasePartnerDto,
        }),
        ApiConflictResponse({ description: 'Partner already exists.' }),
        ApiInternalServerErrorResponse({
            description: 'Internal server error.',
        }),
        ApiNotFoundResponse({ description: 'Partner not found.' }),
        ApiUnauthorizedResponse({ description: 'Unauthorized.' }),
        ApiBadRequestResponse({ description: 'Bad request.' }),
    );
};

export const DeleteOnePartnerApiResponses = () => {
    return applyDecorators(
        ApiBearerAuth(),
        ApiNoContentResponse({
            description: 'Partner deleted successfully.',
            content: { 'text/plain': {} },
        }),
        ApiNotFoundResponse({ description: 'Partner not found.' }),
        ApiInternalServerErrorResponse({
            description: 'Internal server error.',
        }),
        ApiUnauthorizedResponse({ description: 'Unauthorized.' }),
    );
};

export const FindOnePartnerApiResponses = () => {
    return applyDecorators(
        ApiBearerAuth(),
        ApiOkResponse({
            description: 'Returns the partner with the given id.',
            type: FindOnePartnerResponseDto,
        }),
        ApiNotFoundResponse({ description: 'Partner not found.' }),
        ApiUnauthorizedResponse({ description: 'Unauthorized.' }),
        ApiInternalServerErrorResponse({
            description: 'Internal server error.',
        }),
    );
};

export const FindManyPartnerApiResponses = () => {
    return applyDecorators(
        ApiBearerAuth(),
        ApiOkResponse({
            description: 'Returns all partners.',
            isArray: true,
            type: FindManyPartnerResponseDto,
        }),
        ApiUnauthorizedResponse({ description: 'Unauthorized.' }),
    );
};
