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
import { applyDecorators } from '@nestjs/common';
import { BaseUserDto } from 'src/dtos/common/base-user.dto';
import { LoginResponseDto } from 'src/dtos/response/user/login.response.dto';
import { ErrorResponseDto } from 'src/dtos/response/common/error.response.dto';

export const FindOneUserApiResponses = () => {
    return applyDecorators(
        ApiBearerAuth(),
        ApiOkResponse({
            description: 'Returns the user with the given id.',
            schema: {
                properties: {
                    data: { $ref: getSchemaPath(BaseUserDto) },
                },
            },
        }),
        ApiNotFoundResponse({
            description: 'User not found.',
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

export const LoginApiResponses = () => {
    return applyDecorators(
        ApiOkResponse({
            description: 'Returns id and JWT token.',
            schema: {
                properties: {
                    data: { $ref: getSchemaPath(LoginResponseDto) },
                },
            },
        }),
        ApiUnauthorizedResponse({
            description: 'Wrong username or password.',
            type: ErrorResponseDto,
        }),
        ApiInternalServerErrorResponse({
            description: 'Internal server error.',
            type: ErrorResponseDto,
        }),
        ApiBadRequestResponse({
            description: 'Bad request.',
            type: ErrorResponseDto,
        }),
    );
};

export const CreateOneUserApiResponses = () => {
    return applyDecorators(
        ApiCreatedResponse({
            description: 'Returns the created user.',
            schema: {
                properties: {
                    data: { $ref: getSchemaPath(BaseUserDto) },
                },
            },
        }),
        ApiConflictResponse({
            description: 'User already exists.',
            type: ErrorResponseDto,
        }),
        ApiInternalServerErrorResponse({
            description: 'Internal server error.',
            type: ErrorResponseDto,
        }),
        ApiBadRequestResponse({
            description: 'Bad request.',
            type: ErrorResponseDto,
        }),
    );
};

export const UpdateOneUserApiResponses = () => {
    return applyDecorators(
        ApiBearerAuth(),
        ApiOkResponse({
            description: 'Returns the updated user.',
            schema: {
                properties: {
                    data: { $ref: getSchemaPath(BaseUserDto) },
                },
            },
        }),
        ApiConflictResponse({
            description: 'Username conflicts with another user.',
            type: ErrorResponseDto,
        }),
        ApiInternalServerErrorResponse({
            description: 'Internal server error.',
            type: ErrorResponseDto,
        }),
        ApiNotFoundResponse({
            description: 'User not found.',
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

export const DeleteOneUserApiResponses = () => {
    return applyDecorators(
        ApiBearerAuth(),
        ApiNoContentResponse({
            description: 'User deleted successfully.',
            content: { 'text/plain': {} },
        }),
        ApiNotFoundResponse({
            description: 'User not found.',
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
