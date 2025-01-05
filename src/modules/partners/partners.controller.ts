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
    Query,
    UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { PartnersService } from 'src/modules/partners/partners.service';
import { User } from 'src/common/decorators/user.decorator';
import { CreatePartnerDto } from 'src/modules/partners/dtos/partner-request.dtos';
import {
    ApiConflictResponse,
    ApiCreatedResponse,
    ApiNoContentResponse,
    ApiNotFoundResponse,
    ApiOkResponse,
    ApiOperation,
    ApiTags,
} from '@nestjs/swagger';
import { BasePartnerDto } from 'src/modules/partners/dtos/base-partner.dto';
import { FindOnePartnerResponseDto } from 'src/modules/partners/dtos/partner-response.dtos';
import { UpdatePartnerDto } from 'src/modules/partners/dtos/partner-request.dtos';
import { FindManyPartnerResponseDto } from 'src/modules/partners/dtos/partner-response.dtos';
import { ApiCommonResponses } from 'src/common/decorators/api-common-responses.decorator';
import { ErrorDto } from 'src/common/dtos/error.dto';
import { PageOptionsDto } from 'src/common/dtos/page-options.dto';
import { ApiPaginatedResponse } from 'src/common/decorators/api-paginated-response.decorator';

@ApiTags('Partners')
@Controller('partners')
@UseGuards(AuthGuard)
export class PartnersController {
    constructor(private partnersService: PartnersService) {}

    @Get()
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ operationId: 'find partners' })
    @ApiCommonResponses()
    @ApiPaginatedResponse(FindManyPartnerResponseDto)
    findAll(
        @Query() pageOptionsDto: PageOptionsDto,
        @User('id') userId: number,
    ) {
        return this.partnersService.findMany(pageOptionsDto, {
            where: { user: { id: userId } },
        });
    }

    @Get(':id')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ operationId: 'find a partner' })
    @ApiCommonResponses()
    @ApiOkResponse({
        description: 'Returns the partner with the given id.',
        type: FindOnePartnerResponseDto,
    })
    @ApiNotFoundResponse({
        description: 'Partner not found.',
        type: ErrorDto,
    })
    findById(
        @Param('id', new ParseIntPipe()) id: number,
        @User('id') userId: number,
    ) {
        return this.partnersService.findOne({
            where: { id, user: { id: userId } },
        });
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @ApiOperation({ operationId: 'create a partner' })
    @ApiCommonResponses()
    @ApiCreatedResponse({
        description: 'Returns the created partner.',
        type: BasePartnerDto,
    })
    @ApiConflictResponse({
        description: 'Partner already exists.',
        type: ErrorDto,
    })
    createOne(@Body() dto: CreatePartnerDto, @User('id') userId: number) {
        return this.partnersService.createOne({
            ...dto,
            user: { id: userId },
        });
    }

    @Patch(':id')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ operationId: 'update a partner' })
    @ApiCommonResponses()
    @ApiOkResponse({
        description: 'Returns the updated partner.',
        type: BasePartnerDto,
    })
    @ApiConflictResponse({
        description: 'Partner already exists.',
        type: ErrorDto,
    })
    @ApiNotFoundResponse({
        description: 'Partner not found.',
        type: ErrorDto,
    })
    updateById(
        @Param('id', new ParseIntPipe()) id: number,
        @Body() dto: UpdatePartnerDto,
        @User('id') userId: number,
    ) {
        return this.partnersService.updateOne(
            { where: { id, user: { id: userId } } },
            dto,
        );
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
        type: ErrorDto,
    })
    deleteById(
        @Param('id', new ParseIntPipe()) id: number,
        @User('id') userId: number,
    ) {
        return this.partnersService.deleteMany({ id, user: { id: userId } });
    }
}
