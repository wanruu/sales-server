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
import { type FindOptionsWhere, Repository } from 'typeorm';
import {
    CreateOneUserResponseDto,
    FindOneUserResponseDto,
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

    async findOne(
        where: FindOptionsWhere<User>,
    ): Promise<FindOneUserResponseDto> {
        const user = await this.userRepository.findOneBy(where);
        if (!user) {
            throw new NotFoundException('User not found.');
        }
        return plainToInstance(FindOneUserResponseDto, user, {
            excludeExtraneousValues: true,
        });
    }

    async createOne(dto: CreateUserDto): Promise<CreateOneUserResponseDto> {
        const password = hashSync(dto.password, genSaltSync(10));
        const user = this.userRepository.create({ ...dto, password });
        const savedUser = await this.userRepository.save(user);
        return plainToInstance(CreateOneUserResponseDto, savedUser, {
            excludeExtraneousValues: true,
        });
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
        where: FindOptionsWhere<User>,
        dto: UpdateUserDto,
    ): Promise<UpdateOneUserResponseDto> {
        const oldUser = await this.userRepository.findOneBy(where);
        if (!oldUser) throw new NotFoundException('User not found.');

        if (dto.password) {
            dto.password = hashSync(dto.password, genSaltSync(10));
        }
        const newUser = { ...oldUser };
        Object.entries(dto).forEach(([key, value]) => {
            if (value !== undefined) newUser[key] = value;
        });

        const savedUser = await this.userRepository.save(newUser);
        return plainToInstance(UpdateOneUserResponseDto, savedUser, {
            excludeExtraneousValues: true,
        });
    }

    async deleteMany(where: FindOptionsWhere<User>): Promise<void> {
        const deleteResult = await this.userRepository.delete(where);
        if (deleteResult.affected === 0) {
            throw new NotFoundException('User not found.');
        }
    }
}
