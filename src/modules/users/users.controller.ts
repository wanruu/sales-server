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
    UnauthorizedException,
    UseGuards,
} from '@nestjs/common';
import { UsersService } from 'src/modules/users/users.service';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { User } from 'src/common/decorators/user.decorator';
import {
    ApiConflictResponse,
    ApiCreatedResponse,
    ApiExtraModels,
    ApiNoContentResponse,
    ApiNotFoundResponse,
    ApiOkResponse,
    ApiOperation,
    ApiTags,
    ApiUnauthorizedResponse,
    getSchemaPath,
} from '@nestjs/swagger';
import {
    CreateUserDto,
    LoginDto,
    UpdateUserDto,
} from 'src/modules/users/dtos/user-request.dtos';
import {
    CreateOneUserResponseDto,
    FindOneUserResponseDto,
    LoginResponseDto,
    UpdateOneUserResponseDto,
} from 'src/modules/users/dtos/user-response.dtos';
import { ApiCommonResponses } from 'src/common/decorators/api-common-responses.decorator';
import { ErrorResponseDto } from 'src/common/dtos/error-response.dto';

@ApiTags('Users')
@Controller('users')
@ApiExtraModels(
    LoginResponseDto,
    CreateOneUserResponseDto,
    UpdateOneUserResponseDto,
    FindOneUserResponseDto,
)
export class UsersController {
    constructor(private usersService: UsersService) {}

    @Get(':id')
    @HttpCode(HttpStatus.OK)
    @UseGuards(AuthGuard)
    @ApiOperation({ operationId: 'find a user' })
    @ApiCommonResponses()
    @ApiOkResponse({
        description: 'Returns the user with the given id.',
        schema: {
            properties: {
                data: { $ref: getSchemaPath(FindOneUserResponseDto) },
            },
            required: ['data'],
        },
    })
    @ApiNotFoundResponse({
        description: 'User not found.',
        type: ErrorResponseDto,
    })
    async findById(
        @Param('id', new ParseIntPipe()) id: number,
        @User('id') userId: number,
    ) {
        if (userId !== id) {
            throw new UnauthorizedException('Permission denied.');
        }
        const data = await this.usersService.findOne({ where: { id } });
        return { data };
    }

    @Post('login')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ operationId: 'login' })
    @ApiCommonResponses(false)
    @ApiOkResponse({
        description: 'Returns id and JWT token.',
        schema: {
            type: 'object',
            properties: {
                data: { $ref: getSchemaPath(LoginResponseDto) },
            },
            required: ['data'],
        },
    })
    @ApiUnauthorizedResponse({
        description: 'Wrong username or password.',
        type: ErrorResponseDto,
    })
    async login(@Body() dto: LoginDto) {
        const data = await this.usersService.login(dto);
        return { data };
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @ApiOperation({ operationId: 'create a user' })
    @ApiCommonResponses(false)
    @ApiCreatedResponse({
        description: 'Returns the created user.',
        schema: {
            properties: {
                data: { $ref: getSchemaPath(CreateOneUserResponseDto) },
            },
            required: ['data'],
        },
    })
    @ApiConflictResponse({
        description: 'User already exists.',
        type: ErrorResponseDto,
    })
    async createOne(@Body() dto: CreateUserDto) {
        const data = await this.usersService.createOne(dto);
        return { data };
    }

    @Patch(':id')
    @HttpCode(HttpStatus.OK)
    @UseGuards(AuthGuard)
    @ApiOperation({ operationId: 'update a user' })
    @ApiCommonResponses()
    @ApiOkResponse({
        description: 'Returns the updated user.',
        schema: {
            properties: {
                data: { $ref: getSchemaPath(UpdateOneUserResponseDto) },
            },
            required: ['data'],
        },
    })
    @ApiConflictResponse({
        description: 'Username conflicts with another user.',
        type: ErrorResponseDto,
    })
    @ApiNotFoundResponse({
        description: 'User not found.',
        type: ErrorResponseDto,
    })
    async updateById(
        @Param('id', new ParseIntPipe()) id: number,
        @Body() dto: UpdateUserDto,
        @User('id') userId: number,
    ) {
        if (userId !== id) {
            throw new UnauthorizedException('Permission denied.');
        }
        const data = await this.usersService.updateOne({ where: { id } }, dto);
        return { data };
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    @UseGuards(AuthGuard)
    @ApiOperation({ operationId: 'delete a user' })
    @ApiCommonResponses()
    @ApiNoContentResponse({
        description: 'User deleted successfully.',
        content: { 'text/plain': {} },
    })
    @ApiNotFoundResponse({
        description: 'User not found.',
        type: ErrorResponseDto,
    })
    deleteById(
        @Param('id', new ParseIntPipe()) id: number,
        @User('id') userId: number,
    ) {
        if (userId !== id) {
            throw new UnauthorizedException('Permission denied.');
        }
        return this.usersService.deleteMany({ id });
    }
}
