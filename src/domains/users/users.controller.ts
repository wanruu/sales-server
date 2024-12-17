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
import { UserService } from './users.service';
import { LoginDto } from './dto/login.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthGuard } from 'src/domains/auth/auth.guard';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from 'src/decorators/user.decorator';

@Controller('users')
export class UserController {
    constructor(private userService: UserService) {}

    @Get(':id')
    @HttpCode(HttpStatus.OK)
    @UseGuards(AuthGuard)
    findById(@Param('id') id: string, @User() user: string) {
        if (user !== id) {
            throw new UnauthorizedException('Permission denied.');
        }
        return this.userService.findById(id);
    }

    @Post('login')
    @HttpCode(HttpStatus.OK)
    login(@Body() dto: LoginDto) {
        return this.userService.login(dto);
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    create(@Body() dto: CreateUserDto) {
        return this.userService.create(dto);
    }

    @Patch(':id')
    @HttpCode(HttpStatus.OK)
    @UseGuards(AuthGuard)
    update(
        @Param('id') id: string,
        @Body() dto: UpdateUserDto,
        @User() user: string,
    ) {
        if (user !== id) {
            throw new UnauthorizedException('Permission denied.');
        }
        return this.userService.update(id, dto);
    }
}
