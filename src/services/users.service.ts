import {
    ConflictException,
    Injectable,
    InternalServerErrorException,
    NotFoundException,
    UnauthorizedException,
} from '@nestjs/common';
import { User } from 'src/entities/user.entity';
import { compareSync, genSaltSync, hashSync } from 'bcrypt';
import {
    CreateUserDto,
    CreateOneUserResponseDto,
} from 'src/dtos/user/create-user.dto';
import { LoginDto, LoginResponseDto } from 'src/dtos/user/login.dto';
import { JwtService } from '@nestjs/jwt';
import {
    UpdateUserDto,
    UpdateOneUserResponseDto,
} from 'src/dtos/user/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { type FindOneOptions, Repository } from 'typeorm';
import { FindOneUserResponseDto } from 'src/dtos/user/find-user.dto';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
        private jwtService: JwtService,
    ) {}

    async findOne(
        options: FindOneOptions<User>,
    ): Promise<FindOneUserResponseDto> {
        const user = await this.userRepository.findOne(options);
        if (!user) {
            throw new NotFoundException('User not found.');
        }
        return user;
    }

    async createOne(dto: CreateUserDto): Promise<CreateOneUserResponseDto> {
        try {
            const user = this.userRepository.create({
                ...dto,
                password: hashSync(dto.password, genSaltSync(10)),
            });
            const savedUser = await this.userRepository.save(user);
            const { id, name } = savedUser;
            return { id, name };
        } catch (error) {
            if (error.code === '23505') {
                throw new ConflictException('Username is already in use.');
            }
            throw new InternalServerErrorException();
        }
    }

    async login(dto: LoginDto): Promise<LoginResponseDto> {
        const { name, password } = dto;
        const user = await this.userRepository.findOne({
            where: { name },
            select: ['id', 'name', 'password'],
        });
        if (!user || !compareSync(password, user.password)) {
            throw new UnauthorizedException('Incorrect username or password.');
        }
        const { id } = user;
        const accessToken = this.jwtService.sign({ id });
        return { accessToken, id };
    }

    async updateOne(
        options: FindOneOptions<User>,
        dto: UpdateUserDto,
    ): Promise<UpdateOneUserResponseDto> {
        const oldUser = await this.userRepository.findOne(options);
        if (!oldUser) {
            throw new NotFoundException('User not found.');
        }
        try {
            if (dto.password) {
                dto.password = hashSync(dto.password, genSaltSync(10));
            }
            const savedUser = await this.userRepository.save({
                ...oldUser,
                ...dto,
            });
            const { id, name } = savedUser;
            return { id, name };
        } catch (error) {
            if (error.code === '23505') {
                throw new ConflictException('Username is already in use.');
            }
            throw new InternalServerErrorException();
        }
    }
}
