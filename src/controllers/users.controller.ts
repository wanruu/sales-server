import {
    Body,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    Patch,
    Post,
    UnauthorizedException,
    UseGuards,
} from '@nestjs/common';
import { UsersService } from 'src/services/users.service';
import { LoginDto } from 'src/dtos/user/login.dto';
import { CreateUserDto } from 'src/dtos/user/create-user.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { UpdateUserDto } from 'src/dtos/user/update-user.dto';
import { User } from 'src/decorators/user.decorator';
import {
    ApiBearerAuth,
    ApiConflictResponse,
    ApiCreatedResponse,
    ApiInternalServerErrorResponse,
    ApiNotFoundResponse,
    ApiOkResponse,
    ApiTags,
    ApiUnauthorizedResponse,
} from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('Users')
@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) {}

    @Get(':id')
    @HttpCode(HttpStatus.OK)
    @UseGuards(AuthGuard)
    @ApiOkResponse({ description: 'Returns the user with the given id.' })
    @ApiNotFoundResponse({ description: 'User not found.' })
    @ApiUnauthorizedResponse({ description: 'Permission denied.' })
    @ApiInternalServerErrorResponse({ description: 'Internal server error.' })
    findById(@Param('id') id: number, @User('id') userId: number) {
        if (userId !== id) {
            throw new UnauthorizedException('Permission denied.');
        }
        return this.usersService.findById(id);
    }

    @Post('login')
    @HttpCode(HttpStatus.OK)
    @ApiOkResponse({ description: 'Returns the JWT token.' })
    @ApiUnauthorizedResponse({ description: 'Wrong username or password.' })
    @ApiInternalServerErrorResponse({ description: 'Internal server error.' })
    login(@Body() dto: LoginDto) {
        return this.usersService.login(dto);
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @ApiCreatedResponse({ description: 'Returns the created user.' })
    @ApiConflictResponse({ description: 'User already exists.' })
    @ApiInternalServerErrorResponse({ description: 'Internal server error.' })
    create(@Body() dto: CreateUserDto) {
        return this.usersService.create(dto);
    }

    @Patch(':id')
    @HttpCode(HttpStatus.OK)
    @UseGuards(AuthGuard)
    @ApiOkResponse({ description: 'Returns the updated user.' })
    @ApiConflictResponse({
        description: 'Username conflicts with another user.',
    })
    @ApiInternalServerErrorResponse({ description: 'Internal server error.' })
    @ApiNotFoundResponse({ description: 'User not found.' })
    update(
        @Param('id') id: number,
        @Body() dto: UpdateUserDto,
        @User('id') userId: number,
    ) {
        if (userId !== id) {
            throw new UnauthorizedException('Permission denied.');
        }
        return this.usersService.update(id, dto);
    }
}
