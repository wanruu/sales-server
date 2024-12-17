import {
    ConflictException,
    Injectable,
    InternalServerErrorException,
    NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model } from 'mongoose';
import { Partner } from 'src/schemas/partner.schema';
import { CreatePartnerDto } from './dto/create-partner.dto';
import { UpdatePartnerDto } from './dto/update-partner.dto';

@Injectable()
export class PartnerService {
    constructor(
        @InjectModel(Partner.name) private partnerModel: Model<Partner>,
    ) {}

    async findById(id: string, user: string) {
        if (!isValidObjectId(id)) {
            throw new NotFoundException('Partner not found.');
        }
        const partner = await this.partnerModel.findById(id).exec();
        if (!partner || partner.user.toString() !== user) {
            throw new NotFoundException('Product not found.');
        }
        return partner;
    }

    async findAll(user: string) {
        const partners = await this.partnerModel.find({ user }).exec();
        return partners;
    }

    async create(dto: CreatePartnerDto, user: string) {
        try {
            const partner = new this.partnerModel({ ...dto, user });
            return await partner.save();
        } catch (error) {
            if (error.code === 11000) {
                throw new ConflictException('Partner already exists');
            }
            throw new InternalServerErrorException(error.message);
        }
    }

    async update(id: string, dto: UpdatePartnerDto, user: string) {
        if (!isValidObjectId(id)) {
            throw new NotFoundException('Partner not found.');
        }
        const partner = await this.partnerModel.findById(id).exec();
        if (!partner || partner.user.toString() !== user) {
            throw new NotFoundException('Partner not found.');
        }

        try {
            const updatedPartner = await this.partnerModel
                .findByIdAndUpdate(id, dto, { new: true })
                .exec();
            return updatedPartner;
        } catch (error) {
            if (error.code === 11000) {
                throw new ConflictException('Partner already exists.');
            }
            throw new InternalServerErrorException(error.message);
        }
    }
}
