import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    ParseIntPipe,
    Patch,
    Post,
    UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { PartnersService } from 'src/modules/partners/partners.service';
import { User } from 'src/common/decorators/user.decorator';
import { CreatePartnerDto } from 'src/modules/partners/dtos/partner-request.dtos';
import {
    ApiConflictResponse,
    ApiCreatedResponse,
    ApiExtraModels,
    ApiNoContentResponse,
    ApiNotFoundResponse,
    ApiOkResponse,
    ApiOperation,
    ApiTags,
    getSchemaPath,
} from '@nestjs/swagger';
import { BasePartnerDto } from 'src/modules/partners/dtos/base-partner.dto';
import { FindOnePartnerResponseDto } from 'src/modules/partners/dtos/partner-response.dtos';
import { UpdatePartnerDto } from 'src/modules/partners/dtos/partner-request.dtos';
import { FindManyPartnerResponseDto } from 'src/modules/partners/dtos/partner-response.dtos';
import { ApiCommonResponses } from 'src/common/decorators/api-common-responses.decorator';
import { ErrorResponseDto } from 'src/common/dtos/error-response.dto';

@ApiTags('Partners')
@Controller('partners')
@UseGuards(AuthGuard)
@ApiExtraModels(
    BasePartnerDto,
    FindOnePartnerResponseDto,
    FindManyPartnerResponseDto,
)
export class PartnersController {
    constructor(private partnersService: PartnersService) {}

    @Get()
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ operationId: 'find partners' })
    @ApiCommonResponses()
    @ApiOkResponse({
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
            required: ['data', 'meta'],
        },
    })
    async findAll(@User('id') userId: number) {
        const data = await this.partnersService.findMany({
            where: { user: { id: userId } },
        });
        return { data };
    }

    @Get(':id')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ operationId: 'find a partner' })
    @ApiCommonResponses()
    @ApiOkResponse({
        description: 'Returns the partner with the given id.',
        schema: {
            properties: {
                data: {
                    $ref: getSchemaPath(FindOnePartnerResponseDto),
                },
            },
            required: ['data'],
        },
    })
    @ApiNotFoundResponse({
        description: 'Partner not found.',
        type: ErrorResponseDto,
    })
    async findById(
        @Param('id', new ParseIntPipe()) id: number,
        @User('id') userId: number,
    ) {
        const data = await this.partnersService.findOne({
            where: { id, user: { id: userId } },
        });
        return { data };
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @ApiOperation({ operationId: 'create a partner' })
    @ApiCommonResponses()
    @ApiCreatedResponse({
        description: 'Returns the created partner.',
        schema: {
            properties: {
                data: {
                    $ref: getSchemaPath(BasePartnerDto),
                },
            },
            required: ['data'],
        },
    })
    @ApiConflictResponse({
        description: 'Partner already exists.',
        type: ErrorResponseDto,
    })
    async createOne(@Body() dto: CreatePartnerDto, @User('id') userId: number) {
        const data = await this.partnersService.createOne({
            ...dto,
            user: { id: userId },
        });
        return { data };
    }

    @Patch(':id')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ operationId: 'update a partner' })
    @ApiCommonResponses()
    @ApiOkResponse({
        description: 'Returns the updated partner.',
        schema: {
            properties: {
                data: {
                    $ref: getSchemaPath(BasePartnerDto),
                },
            },
            required: ['data'],
        },
    })
    @ApiConflictResponse({
        description: 'Partner already exists.',
        type: ErrorResponseDto,
    })
    @ApiNotFoundResponse({
        description: 'Partner not found.',
        type: ErrorResponseDto,
    })
    async updateById(
        @Param('id', new ParseIntPipe()) id: number,
        @Body() dto: UpdatePartnerDto,
        @User('id') userId: number,
    ) {
        const data = await this.partnersService.updateOne(
            { where: { id, user: { id: userId } } },
            dto,
        );
        return { data };
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    @ApiOperation({ operationId: 'delete a partner' })
    @ApiCommonResponses()
    @ApiNoContentResponse({
        description: 'Partner deleted successfully.',
        content: { 'text/plain': {} },
    })
    @ApiNotFoundResponse({
        description: 'Partner not found.',
        type: ErrorResponseDto,
    })
    deleteById(
        @Param('id', new ParseIntPipe()) id: number,
        @User('id') userId: number,
    ) {
        return this.partnersService.deleteMany({ id, user: { id: userId } });
    }
}
