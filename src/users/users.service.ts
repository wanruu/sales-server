import {
    ConflictException,
    Injectable,
    InternalServerErrorException,
    NotFoundException,
    UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model } from 'mongoose';
import { User } from 'src/schemas/user.schema';
import { compareSync, genSaltSync, hashSync } from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
    constructor(
        @InjectModel(User.name) private userModel: Model<User>,
        private jwtService: JwtService,
    ) {}

    async findById(id: string) {
        if (!isValidObjectId(id)) {
            throw new NotFoundException('User not found.');
        }
        const user = await this.userModel
            .findById(id)
            .select('-password')
            .exec();
        if (!user) {
            throw new NotFoundException('User not found.');
        }
        return user;
    }

    async create(dto: CreateUserDto) {
        try {
            dto.password = hashSync(dto.password, genSaltSync(10));
            const user = new this.userModel(dto);
            const newUser = await user.save();
            const { password, ...userWithoutPassword } = newUser.toObject();
            return userWithoutPassword;
        } catch (error) {
            if (error.code === 11000) {
                throw new ConflictException('Username is already in use.');
            }
            throw new InternalServerErrorException(error.message);
        }
    }

    async login(dto: LoginDto): Promise<{ access_token: string }> {
        const { name, password } = dto;
        const user = await this.userModel.findOne({ name }).exec();
        if (!user || !compareSync(password, user.password)) {
            throw new UnauthorizedException('Incorrect username or password.');
        }
        const payload = { sub: user._id, username: user.name };
        const token = this.jwtService.sign(payload);
        return { access_token: token };
    }

    async update(id: string, dto: UpdateUserDto) {
        if (!isValidObjectId(id) || !(await this.userModel.findById(id))) {
            throw new NotFoundException('User not found.');
        }
        try {
            dto.password = hashSync(dto.password, genSaltSync(10));
            const updatedUser = await this.userModel
                .findByIdAndUpdate(id, dto, { new: true })
                .select('-password')
                .exec();
            return updatedUser;
        } catch (error) {
            if (error.code === 11000) {
                throw new ConflictException('Username is already in use.');
            }
            throw new InternalServerErrorException(error.message);
        }
    }
}
