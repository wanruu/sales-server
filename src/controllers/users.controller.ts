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

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) {}

    @Get(':id')
    @HttpCode(HttpStatus.OK)
    @UseGuards(AuthGuard)
    findById(@Param('id') id: string, @User('id') userId: string) {
        if (userId !== id) {
            throw new UnauthorizedException('Permission denied.');
        }
        return this.usersService.findById(id);
    }

    @Post('login')
    @HttpCode(HttpStatus.OK)
    login(@Body() dto: LoginDto) {
        return this.usersService.login(dto);
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    create(@Body() dto: CreateUserDto) {
        return this.usersService.create(dto);
    }

    @Patch(':id')
    @HttpCode(HttpStatus.OK)
    @UseGuards(AuthGuard)
    update(
        @Param('id') id: string,
        @Body() dto: UpdateUserDto,
        @User('id') userId: string,
    ) {
        if (userId !== id) {
            throw new UnauthorizedException('Permission denied.');
        }
        return this.usersService.update(id, dto);
    }
}
