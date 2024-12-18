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
        const { password, ...userWithoutPassword } = user;
        return userWithoutPassword;
    }

    async create(dto: CreateUserDto): Promise<Partial<User>> {
        try {
            const user = new User();
            user.name = dto.name;
            user.password = hashSync(dto.password, genSaltSync(10));
            const savedUser = await this.userRepository.save(user);
            const { password, ...userWithoutPassword } = savedUser;
            return userWithoutPassword;
        } catch (error) {
            console.log(error);
            // TODO: handle error
            if (error.code === 11000) {
                throw new ConflictException('Username is already in use.');
            }
            throw new InternalServerErrorException(error.message);
        }
    }

    async login(dto: LoginDto): Promise<{ access_token: string }> {
        const { name, password } = dto;
        const user = await this.userRepository.findOneBy({ name });
        if (!user || !compareSync(password, user.password)) {
            throw new UnauthorizedException('Incorrect username or password.');
        }
        const payload = { sub: user.id, username: user.name };
        const token = this.jwtService.sign(payload);
        return { access_token: token };
    }

    async update(id: number, dto: UpdateUserDto): Promise<Partial<User>> {
        if (!(await this.userRepository.findOneBy({ id }))) {
            throw new NotFoundException('User not found.');
        }
        try {
            await this.userRepository.update(id, dto);
            const updatedUser = await this.userRepository.findOneBy({ id });
            const { password, ...userWithoutPassword } = updatedUser;
            return userWithoutPassword;
        } catch (error) {
            // TODO: handle error
            if (error.code === 11000) {
                throw new ConflictException('Username is already in use.');
            }
            throw new InternalServerErrorException(error.message);
        }
    }
}
