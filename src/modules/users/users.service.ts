import {
    Injectable,
    NotFoundException,
    UnauthorizedException,
} from '@nestjs/common';
import { User } from 'src/modules/users/user.entity';
import { compareSync, genSaltSync, hashSync } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import {
    CreateUserDto,
    LoginDto,
    UpdateUserDto,
} from 'src/modules/users/dtos/user-request.dtos';
import { InjectRepository } from '@nestjs/typeorm';
import {
    type FindOneOptions,
    type FindOptionsWhere,
    Repository,
} from 'typeorm';
import {
    CreateOneUserResponseDto,
    LoginResponseDto,
    UpdateOneUserResponseDto,
} from 'src/modules/users/dtos/user-response.dtos';
import { plainToInstance } from 'class-transformer';

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
        return plainToInstance(User, user);
    }

    async createOne(dto: CreateUserDto): Promise<CreateOneUserResponseDto> {
        const user = this.userRepository.create({
            ...dto,
            password: hashSync(dto.password, genSaltSync(10)),
        });
        const savedUser = await this.userRepository.save(user);
        return plainToInstance(User, savedUser);
    }

    async login(dto: LoginDto): Promise<LoginResponseDto> {
        const { name, password } = dto;
        const user = await this.userRepository.findOne({ where: { name } });
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

        if (dto.password) {
            dto.password = hashSync(dto.password, genSaltSync(10));
        }
        const savedUser = await this.userRepository.save({
            ...oldUser,
            ...dto,
        });
        return plainToInstance(User, savedUser);
    }

    async deleteMany(criteria: FindOptionsWhere<User>): Promise<void> {
        const deleteResult = await this.userRepository.delete(criteria);
        if (deleteResult.affected === 0) {
            throw new NotFoundException('User not found.');
        }
    }
}
