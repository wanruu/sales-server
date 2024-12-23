import {
    Body,
    Controller,
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
import { LoginDto, LoginResponseDto } from 'src/dtos/user/login.dto';
import {
    CreateUserDto,
    CreateOneUserResponseDto,
} from 'src/dtos/user/create-user.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import {
    UpdateUserDto,
    UpdateOneUserResponseDto,
} from 'src/dtos/user/update-user.dto';
import { User } from 'src/decorators/user.decorator';
import { ApiTags } from '@nestjs/swagger';
import { FindOneUserResponseDto } from 'src/dtos/user/find-user.dto';
import {
    CreateOneUserApiResponses,
    FindOneUserApiResponses,
    LoginApiResponses,
    UpdateOneUserApiResponses,
} from 'src/decorators/api-response/user.api-response.decorator';

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
    ): Promise<FindOneUserResponseDto> {
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
    @CreateOneUserApiResponses()
    createOne(@Body() dto: CreateUserDto): Promise<CreateOneUserResponseDto> {
        return this.usersService.createOne(dto);
    }

    @Patch(':id')
    @UpdateOneUserApiResponses()
    updateById(
        @Param('id', new ParseIntPipe()) id: number,
        @Body() dto: UpdateUserDto,
        @User('id') userId: number,
    ): Promise<UpdateOneUserResponseDto> {
        if (userId !== id) {
            throw new NotFoundException('User not found.');
        }
        return this.usersService.updateOne({ where: { id } }, dto);
    }
}
