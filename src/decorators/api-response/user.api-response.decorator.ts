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
import { applyDecorators } from '@nestjs/common';
import { BaseUserDto } from 'src/dtos/common/base-user.dto';
import { LoginResponseDto } from 'src/dtos/response/user/login.response.dto';

export const FindOneUserApiResponses = () => {
    return applyDecorators(
        ApiBearerAuth(),
        ApiOkResponse({
            description: 'Returns the user with the given id.',
            type: BaseUserDto,
        }),
        ApiNotFoundResponse({ description: 'User not found.' }),
        ApiUnauthorizedResponse({ description: 'Unauthorized.' }),
        ApiInternalServerErrorResponse({
            description: 'Internal server error.',
        }),
    );
};

export const LoginApiResponses = () => {
    return applyDecorators(
        ApiOkResponse({
            description: 'Returns id and JWT token.',
            type: LoginResponseDto,
        }),
        ApiUnauthorizedResponse({ description: 'Wrong username or password.' }),
        ApiInternalServerErrorResponse({
            description: 'Internal server error.',
        }),
        ApiBadRequestResponse({ description: 'Bad request.' }),
    );
};

export const CreateOneUserApiResponses = () => {
    return applyDecorators(
        ApiCreatedResponse({
            description: 'Returns the created user.',
            type: BaseUserDto,
        }),
        ApiConflictResponse({ description: 'User already exists.' }),
        ApiInternalServerErrorResponse({
            description: 'Internal server error.',
        }),
        ApiBadRequestResponse({ description: 'Bad request.' }),
    );
};

export const UpdateOneUserApiResponses = () => {
    return applyDecorators(
        ApiBearerAuth(),
        ApiOkResponse({
            description: 'Returns the updated user.',
            type: BaseUserDto,
        }),
        ApiConflictResponse({
            description: 'Username conflicts with another user.',
        }),
        ApiInternalServerErrorResponse({
            description: 'Internal server error.',
        }),
        ApiNotFoundResponse({ description: 'User not found.' }),
        ApiUnauthorizedResponse({ description: 'Unauthorized.' }),
        ApiBadRequestResponse({ description: 'Bad request.' }),
    );
};

export const DeleteOneUserApiResponses = () => {
    return applyDecorators(
        ApiBearerAuth(),
        ApiNoContentResponse({
            description: 'User deleted successfully.',
            content: { 'text/plain': {} },
        }),
        ApiNotFoundResponse({ description: 'User not found.' }),
        ApiInternalServerErrorResponse({
            description: 'Internal server error.',
        }),
        ApiUnauthorizedResponse({ description: 'Unauthorized.' }),
    );
};
