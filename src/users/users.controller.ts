import {
    Body,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Post,
} from '@nestjs/common';
import { UserService } from './users.services';
import { LoginDto } from './dto/login.dto';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UserController {
    constructor(private userService: UserService) {}

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

    @Get()
    @HttpCode(HttpStatus.OK)
    findAll() {
        return this.userService.findAll();
    }

    @Get('test')
    @HttpCode(HttpStatus.OK)
    test() {
        return 'hello world';
    }
}
