import { applyDecorators } from '@nestjs/common';
import {
    ApiBadRequestResponse,
    ApiBearerAuth,
    ApiInternalServerErrorResponse,
    ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { ErrorResponseDto } from 'src/common/dtos/error-response.dto';

export const ApiCommonResponses = (auth: boolean = true) => {
    const decorator = applyDecorators(
        ApiInternalServerErrorResponse({
            description: 'Internal server error.',
            type: ErrorResponseDto,
        }),
        ApiBadRequestResponse({
            description: 'Bad request.',
            type: ErrorResponseDto,
        }),
    );
    if (auth) {
        return applyDecorators(
            decorator,
            ApiBearerAuth(),
            ApiUnauthorizedResponse({
                description: 'Unauthorized.',
                type: ErrorResponseDto,
            }),
        );
    }
    return decorator;
};
