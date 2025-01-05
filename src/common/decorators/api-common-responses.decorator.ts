import { applyDecorators } from '@nestjs/common';
import {
    ApiBadRequestResponse,
    ApiBearerAuth,
    ApiInternalServerErrorResponse,
    ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { ErrorDto } from 'src/common/dtos/error.dto';

export const ApiCommonResponses = (auth: boolean = true) => {
    const decorator = applyDecorators(
        ApiInternalServerErrorResponse({
            description: 'Internal server error.',
            type: ErrorDto,
        }),
        ApiBadRequestResponse({
            description: 'Bad request.',
            type: ErrorDto,
        }),
    );
    if (auth) {
        return applyDecorators(
            decorator,
            ApiBearerAuth(),
            ApiUnauthorizedResponse({
                description: 'Unauthorized.',
                type: ErrorDto,
            }),
        );
    }
    return decorator;
};
