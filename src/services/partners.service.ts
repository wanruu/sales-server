import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePartnerDto } from 'src/dtos/request/partner/create-partner.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Partner } from 'src/entities/partner.entity';
import {
    type FindManyOptions,
    type FindOneOptions,
    type FindOptionsWhere,
    Repository,
} from 'typeorm';
import { BasePartnerDto } from 'src/dtos/common/base-partner.dto';
import { UpdatePartnerDto } from 'src/dtos/request/partner/update-partner.dto';

@Injectable()
export class PartnersService {
    constructor(
        @InjectRepository(Partner)
        private partnerRepository: Repository<Partner>,
    ) {}

    async findOne(options: FindOneOptions<Partner>): Promise<Partner> {
        const partner = await this.partnerRepository.findOne(options);
        if (!partner) {
            throw new NotFoundException('Partner not found.');
        }
        return partner;
    }

    findMany(options?: FindManyOptions<Partner>): Promise<Partner[]> {
        return this.partnerRepository.find(options);
    }

    async createOne(
        dto: CreatePartnerDto & { user: { id: number } },
    ): Promise<BasePartnerDto> {
        const partner = this.partnerRepository.create(dto);
        const savedPartner = await this.partnerRepository.save(partner);
        const { user, deletedAt, createdAt, updatedAt, ...rest } = savedPartner;
        return rest;
    }

    async updateOne(
        options: FindOneOptions<Partner>,
        dto: UpdatePartnerDto,
    ): Promise<BasePartnerDto> {
        const oldPartner = await this.partnerRepository.findOne(options);
        if (!oldPartner) {
            throw new NotFoundException('Partner not found.');
        }
        const savedPartner = await this.partnerRepository.save({
            ...oldPartner,
            ...dto,
        });
        const { user, updatedAt, ...rest } = savedPartner;
        return rest;
    }

    async deleteMany(criteria: FindOptionsWhere<Partner>): Promise<void> {
        const deleteResult = await this.partnerRepository.delete(criteria);
        if (deleteResult.affected === 0) {
            throw new NotFoundException('Partner not found.');
        }
    }
}
