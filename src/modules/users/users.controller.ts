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
    ApiNoContentResponse,
    ApiNotFoundResponse,
    ApiOkResponse,
    ApiOperation,
    ApiTags,
    ApiUnauthorizedResponse,
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
import { ErrorDto } from 'src/common/dtos/error.dto';

@ApiTags('Users')
@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) {}

    @Get(':id')
    @HttpCode(HttpStatus.OK)
    @UseGuards(AuthGuard)
    @ApiOperation({ operationId: 'find a user' })
    @ApiCommonResponses()
    @ApiOkResponse({
        description: 'Returns the user with the given id.',
        type: FindOneUserResponseDto,
    })
    @ApiNotFoundResponse({ description: 'User not found.', type: ErrorDto })
    findById(
        @Param('id', new ParseIntPipe()) id: number,
        @User('id') userId: number,
    ) {
        if (userId !== id) {
            throw new UnauthorizedException('Permission denied.');
        }
        return this.usersService.findOne({ id });
    }

    @Post('login')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ operationId: 'login' })
    @ApiCommonResponses(false)
    @ApiOkResponse({
        description: 'Returns id and JWT token.',
        type: LoginResponseDto,
    })
    @ApiUnauthorizedResponse({
        description: 'Wrong username or password.',
        type: ErrorDto,
    })
    login(@Body() dto: LoginDto) {
        return this.usersService.login(dto);
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @ApiOperation({ operationId: 'create a user' })
    @ApiCommonResponses(false)
    @ApiCreatedResponse({
        description: 'Returns the created user.',
        type: CreateOneUserResponseDto,
    })
    @ApiConflictResponse({
        description: 'User already exists.',
        type: ErrorDto,
    })
    createOne(@Body() dto: CreateUserDto) {
        return this.usersService.createOne(dto);
    }

    @Patch(':id')
    @HttpCode(HttpStatus.OK)
    @UseGuards(AuthGuard)
    @ApiOperation({ operationId: 'update a user' })
    @ApiCommonResponses()
    @ApiOkResponse({
        description: 'Returns the updated user.',
        type: UpdateOneUserResponseDto,
    })
    @ApiConflictResponse({
        description: 'Username conflicts with another user.',
        type: ErrorDto,
    })
    @ApiNotFoundResponse({
        description: 'User not found.',
        type: ErrorDto,
    })
    updateById(
        @Param('id', new ParseIntPipe()) id: number,
        @Body() dto: UpdateUserDto,
        @User('id') userId: number,
    ) {
        if (userId !== id) {
            throw new UnauthorizedException('Permission denied.');
        }
        return this.usersService.updateOne({ id }, dto);
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
        type: ErrorDto,
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
