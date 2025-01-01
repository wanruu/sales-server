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
import { UsersService } from 'src/services/users.service';
import { LoginDto } from 'src/dtos/request/user/login.dto';
import { CreateUserDto } from 'src/dtos/request/user/create-user.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { UpdateUserDto } from 'src/dtos/request/user/update-user.dto';
import { User } from 'src/decorators/user.decorator';
import { ApiExtraModels, ApiTags } from '@nestjs/swagger';
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
@ApiExtraModels(BaseUserDto, LoginResponseDto)
export class UsersController {
    constructor(private usersService: UsersService) {}

    @Get(':id')
    @HttpCode(HttpStatus.OK)
    @UseGuards(AuthGuard)
    @FindOneUserApiResponses()
    async findById(
        @Param('id', new ParseIntPipe()) id: number,
        @User('id') userId: number,
    ) {
        if (userId !== id) {
            throw new UnauthorizedException('Permisson denied.');
        }
        const data = await this.usersService.findOne({ where: { id } });
        return { data };
    }

    @Post('login')
    @HttpCode(HttpStatus.OK)
    @LoginApiResponses()
    async login(@Body() dto: LoginDto) {
        const data = await this.usersService.login(dto);
        return { data };
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @CreateOneUserApiResponses()
    async createOne(@Body() dto: CreateUserDto) {
        const data = await this.usersService.createOne(dto);
        return { data };
    }

    @Patch(':id')
    @HttpCode(HttpStatus.OK)
    @UseGuards(AuthGuard)
    @UpdateOneUserApiResponses()
    async updateById(
        @Param('id', new ParseIntPipe()) id: number,
        @Body() dto: UpdateUserDto,
        @User('id') userId: number,
    ) {
        if (userId !== id) {
            throw new UnauthorizedException('Permisson denied.');
        }
        const data = await this.usersService.updateOne({ where: { id } }, dto);
        return { data };
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    @UseGuards(AuthGuard)
    @DeleteOneUserApiResponses()
    deleteById(
        @Param('id', new ParseIntPipe()) id: number,
        @User('id') userId: number,
    ) {
        if (userId !== id) {
            throw new UnauthorizedException('Permisson denied.');
        }
        return this.usersService.deleteMany({ id });
    }
}
