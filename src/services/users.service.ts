import {
    Injectable,
    NotFoundException,
    UnauthorizedException,
} from '@nestjs/common';
import { User } from 'src/entities/user.entity';
import { compareSync, genSaltSync, hashSync } from 'bcrypt';
import { CreateUserDto } from 'src/dtos/request/user/create-user.dto';
import { LoginDto } from 'src/dtos/request/user/login.dto';
import { JwtService } from '@nestjs/jwt';
import { UpdateUserDto } from 'src/dtos/request/user/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import {
    type FindOneOptions,
    type FindOptionsWhere,
    Repository,
} from 'typeorm';
import { BaseUserDto } from 'src/dtos/common/base-user.dto';
import { LoginResponseDto } from 'src/dtos/response/user/login.response.dto';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
        private jwtService: JwtService,
    ) {}

    async findOne(options: FindOneOptions<User>): Promise<User> {
        const user = await this.userRepository.findOne(options);
        if (!user) {
            throw new NotFoundException('User not found.');
        }
        return user;
    }

    async createOne(dto: CreateUserDto): Promise<BaseUserDto> {
        const user = this.userRepository.create({
            ...dto,
            password: hashSync(dto.password, genSaltSync(10)),
        });
        const savedUser = await this.userRepository.save(user);
        const { id, name } = savedUser;
        return { id, name };
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
    ): Promise<BaseUserDto> {
        const oldUser = await this.userRepository.findOne(options);
        if (!oldUser) {
            throw new NotFoundException('User not found.');
        }

        if (dto.password) {
            dto.password = hashSync(dto.password, genSaltSync(10));
        }
        const savedUser = await this.userRepository.save({
            ...oldUser,
            ...dto,
        });
        const { id, name } = savedUser;
        return { id, name };
    }

    async deleteMany(criteria: FindOptionsWhere<User>): Promise<void> {
        const deleteResult = await this.userRepository.delete(criteria);
        if (deleteResult.affected === 0) {
            throw new NotFoundException('User not found.');
        }
    }
}
