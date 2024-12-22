import { applyDecorators } from '@nestjs/common';
import {
    ApiBearerAuth,
    ApiCreatedResponse,
    ApiInternalServerErrorResponse,
    ApiNoContentResponse,
    ApiNotFoundResponse,
    ApiOkResponse,
    ApiUnauthorizedResponse,
    ApiBadRequestResponse,
} from '@nestjs/swagger';
import { BaseInvoiceItemWithRelationsDto } from 'src/dtos/common/base-invoice-item.dto';
import { FindManyInvoiceItemDto } from 'src/dtos/response/invoice-item/find-many-invoice-item.response.dto';

export const CreateOneInvoiceItemApiResponses = () => {
    return applyDecorators(
        ApiBearerAuth(),
        ApiCreatedResponse({
            description: 'Returns the created invoice item.',
            type: BaseInvoiceItemWithRelationsDto,
        }),
        ApiInternalServerErrorResponse({
            description: 'Internal server error.',
        }),
        ApiUnauthorizedResponse({ description: 'Unauthorized.' }),
        ApiBadRequestResponse({ description: 'Bad request.' }),
    );
};

export const UpdateOneInvoiceItemApiResponses = () => {
    return applyDecorators(
        ApiBearerAuth(),
        ApiOkResponse({
            description: 'Returns the updated invoice item.',
            type: BaseInvoiceItemWithRelationsDto,
        }),
        ApiInternalServerErrorResponse({
            description: 'Internal server error.',
        }),
        ApiNotFoundResponse({ description: 'Invoice item not found.' }),
        ApiUnauthorizedResponse({ description: 'Unauthorized.' }),
        ApiBadRequestResponse({ description: 'Bad request.' }),
    );
};

export const DeleteOneInvoiceItemApiResponses = () => {
    return applyDecorators(
        ApiBearerAuth(),
        ApiNoContentResponse({
            description: 'Invoice item deleted successfully.',
            content: { 'text/plain': {} },
        }),
        ApiNotFoundResponse({ description: 'Invoice item not found.' }),
        ApiInternalServerErrorResponse({
            description: 'Internal server error.',
        }),
        ApiUnauthorizedResponse({ description: 'Unauthorized.' }),
    );
};

export const FindManyInvoiceItemApiResponses = () => {
    return applyDecorators(
        ApiBearerAuth(),
        ApiOkResponse({
            description: 'Returns all invoice items.',
            isArray: true,
            type: FindManyInvoiceItemDto,
        }),
        ApiUnauthorizedResponse({ description: 'Unauthorized.' }),
    );
};
