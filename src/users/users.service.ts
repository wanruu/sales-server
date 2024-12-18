import {
    ConflictException,
    Injectable,
    InternalServerErrorException,
    NotFoundException,
    UnauthorizedException,
} from '@nestjs/common';
import { User } from './entity/user.entity';
import { compareSync, genSaltSync, hashSync } from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        private jwtService: JwtService,
    ) {}

    async findById(id: number): Promise<Partial<User>> {
        const user = await this.userRepository.findOneBy({ id });
        if (!user) {
            throw new NotFoundException('User not found.');
        }
        return user;
    }

    async create(dto: CreateUserDto): Promise<Partial<User>> {
        try {
            const user = this.userRepository.create({
                ...dto,
                password: hashSync(dto.password, genSaltSync(10)),
            });
            const savedUser = await this.userRepository.save(user);
            const { password, ...userWithoutPassword } = savedUser;
            return userWithoutPassword;
        } catch (error) {
            if (error.code === '23505') {
                throw new ConflictException('Username is already in use.');
            }
            throw new InternalServerErrorException(error.message);
        }
    }

    async login(dto: LoginDto): Promise<{ access_token: string }> {
        const { name, password } = dto;
        const user = await this.userRepository.findOne({
            where: { name },
            select: ['password'],
        });
        if (!user || !compareSync(password, user.password)) {
            throw new UnauthorizedException('Incorrect username or password.');
        }
        const payload = { sub: user.id, id: user.id, username: user.name };
        const token = this.jwtService.sign(payload);
        return { access_token: token };
    }

    async update(id: number, dto: UpdateUserDto): Promise<Partial<User>> {
        try {
            const oldUser = await this.userRepository.findOneBy({ id });
            if (!oldUser) {
                throw new NotFoundException('User not found.');
            }
            if (dto.password) {
                dto.password = hashSync(dto.password, genSaltSync(10));
            }
            return await this.userRepository
                .save({ ...oldUser, ...dto })
                .then((data) => {
                    const { password, ...userWithoutPassword } = data;
                    return userWithoutPassword;
                });
        } catch (error) {
            if (error.code === '23505') {
                throw new ConflictException('Username is already in use.');
            }
            throw new InternalServerErrorException();
        }
    }
}
