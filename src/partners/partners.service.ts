import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePartnerDto } from './dto/create-partner.dto';
import { UpdatePartnerDto } from './dto/update-partner.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Partner } from './entity/partner.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PartnerService {
    constructor(
        @InjectRepository(Partner)
        private partnerRepository: Repository<Partner>,
    ) {}

    async findById(id: number, user: number) {
        const partner = await this.partnerRepository.findOneBy({ id });
        if (!partner || partner.user.id !== user) {
            throw new NotFoundException('Product not found.');
        }
        return partner;
    }

    async findAll(user: number) {
        // const partners = await this.partnerModel.find({ user }).exec();
        // return partners;
    }

    async create(dto: CreatePartnerDto, user: number) {
        // try {
        //     const partner = new this.partnerModel({ ...dto, user });
        //     return await partner.save();
        // } catch (error) {
        //     if (error.code === 11000) {
        //         throw new ConflictException('Partner already exists');
        //     }
        //     throw new InternalServerErrorException(error.message);
        // }
    }

    async update(id: number, dto: UpdatePartnerDto, user: number) {
        // if (!isValidObjectId(id)) {
        //     throw new NotFoundException('Partner not found.');
        // }
        // const partner = await this.partnerModel.findById(id).exec();
        // if (!partner || partner.user.toString() !== user) {
        //     throw new NotFoundException('Partner not found.');
        // }
        // try {
        //     const updatedPartner = await this.partnerModel
        //         .findByIdAndUpdate(id, dto, { new: true })
        //         .exec();
        //     return updatedPartner;
        // } catch (error) {
        //     if (error.code === 11000) {
        //         throw new ConflictException('Partner already exists.');
        //     }
        //     throw new InternalServerErrorException(error.message);
        // }
    }
}
