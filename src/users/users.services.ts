import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
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

    findOneByName(name: string) {
        return this.userModel.findOne({ name }).exec();
    }

    findOneById(id: string) {
        return this.userModel.findById(id).exec();
    }

    findAll() {
        return this.userModel.find().exec();
    }

    async create(dto: CreateUserDto) {
        dto.password = hashSync(dto.password, genSaltSync(10));
        const newUser = new this.userModel(dto);
        await newUser.save();
        const { password, ...userWithoutPassword } = newUser.toObject();
        return userWithoutPassword;
    }

    async login(dto: LoginDto) {
        const { name, password } = dto;
        const user = await this.findOneByName(name);
        if (!user || !compareSync(password, user.password)) {
            throw new UnauthorizedException();
        }
        const token = this.jwtService.sign({ user: user._id });
        return { accessToken: token };
    }

    async update(id: string, dto: UpdateUserDto) {
        const newUser = this.userModel.findByIdAndUpdate(id, dto, {
            new: true,
        });
        return newUser;
    }
}
