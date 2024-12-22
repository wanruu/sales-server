import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    HttpStatus,
    NotFoundException,
    Param,
    ParseIntPipe,
    Patch,
    Post,
    UseGuards,
} from '@nestjs/common';
import { UsersService } from 'src/services/users.service';
import { LoginDto } from 'src/dtos/request/user/login.dto';
import { CreateUserDto } from 'src/dtos/request/user/create-user.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { UpdateUserDto } from 'src/dtos/request/user/update-user.dto';
import { User } from 'src/decorators/user.decorator';
import { ApiTags } from '@nestjs/swagger';
import {
    CreateOneUserApiResponses,
    DeleteOneUserApiResponses,
    FindOneUserApiResponses,
    LoginApiResponses,
    UpdateOneUserApiResponses,
} from 'src/decorators/api-response/user.api-response.decorator';
import { BaseUserDto } from 'src/dtos/common/base-user.dto';
import { LoginResponseDto } from 'src/dtos/response/user/login.response.dto';

@ApiTags('Users')
@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) {}

    @Get(':id')
    @HttpCode(HttpStatus.OK)
    @UseGuards(AuthGuard)
    @FindOneUserApiResponses()
    findById(
        @Param('id', new ParseIntPipe()) id: number,
        @User('id') userId: number,
    ): Promise<BaseUserDto> {
        if (userId !== id) {
            throw new NotFoundException('User not found.');
        }
        return this.usersService.findOne({ where: { id } });
    }

    @Post('login')
    @HttpCode(HttpStatus.OK)
    @LoginApiResponses()
    login(@Body() dto: LoginDto): Promise<LoginResponseDto> {
        return this.usersService.login(dto);
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @CreateOneUserApiResponses()
    createOne(@Body() dto: CreateUserDto): Promise<BaseUserDto> {
        return this.usersService.createOne(dto);
    }

    @Patch(':id')
    @HttpCode(HttpStatus.OK)
    @UseGuards(AuthGuard)
    @UpdateOneUserApiResponses()
    updateById(
        @Param('id', new ParseIntPipe()) id: number,
        @Body() dto: UpdateUserDto,
        @User('id') userId: number,
    ): Promise<BaseUserDto> {
        if (userId !== id) {
            throw new NotFoundException('User not found.');
        }
        return this.usersService.updateOne({ where: { id } }, dto);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    @UseGuards(AuthGuard)
    @DeleteOneUserApiResponses()
    deleteById(
        @Param('id', new ParseIntPipe()) id: number,
        @User('id') userId: number,
    ): Promise<void> {
        if (userId !== id) {
            throw new NotFoundException('User not found.');
        }
        return this.usersService.deleteMany({ id });
    }
}
