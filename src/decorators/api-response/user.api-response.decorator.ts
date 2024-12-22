import {
    ApiBadRequestResponse,
    ApiBearerAuth,
    ApiConflictResponse,
    ApiCreatedResponse,
    ApiInternalServerErrorResponse,
    ApiNotFoundResponse,
    ApiOkResponse,
    ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { applyDecorators } from '@nestjs/common';
import { FindOneUserResponseDto } from 'src/dtos/user/find-user.dto';
import { LoginResponseDto } from 'src/dtos/user/login.dto';
import { CreateOneUserResponseDto } from 'src/dtos/user/create-user.dto';
import { UpdateOneUserResponseDto } from 'src/dtos/user/update-user.dto';

export const FindOneUserApiResponses = () => {
    return applyDecorators(
        ApiBearerAuth(),
        ApiOkResponse({
            description: 'Returns the user with the given id.',
            type: FindOneUserResponseDto,
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
            type: CreateOneUserResponseDto,
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
            type: UpdateOneUserResponseDto,
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
