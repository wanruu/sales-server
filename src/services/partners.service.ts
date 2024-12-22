import {
    ConflictException,
    Injectable,
    InternalServerErrorException,
    NotFoundException,
} from '@nestjs/common';
import {
    CreatePartnerDto,
    CreateOnePartnerResponseDto,
} from 'src/dtos/partner/create-partner.dto';
import {
    UpdatePartnerDto,
    UpdateOnePartnerResponseDto,
} from 'src/dtos/partner/update-partner.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Partner } from 'src/entities/partner.entity';
import {
    type FindManyOptions,
    type FindOneOptions,
    FindOptionsWhere,
    Repository,
} from 'typeorm';
import {
    FindManyPartnerResponseDto,
    FindOnePartnerResponseDto,
} from 'src/dtos/partner/find-partner.dto';

@Injectable()
export class PartnersService {
    constructor(
        @InjectRepository(Partner)
        private partnerRepository: Repository<Partner>,
    ) {}

    async findOne(
        options: FindOneOptions<Partner>,
    ): Promise<FindOnePartnerResponseDto> {
        const partner = await this.partnerRepository.findOne(options);
        if (!partner) {
            throw new NotFoundException('Partner not found.');
        }
        return partner;
    }

    async findMany(
        options?: FindManyOptions<Partner>,
    ): Promise<FindManyPartnerResponseDto[]> {
        const partners = await this.partnerRepository.find(options);
        return partners;
    }

    async createOne(
        dto: CreatePartnerDto & { user: { id: number } },
    ): Promise<CreateOnePartnerResponseDto> {
        try {
            const partner = this.partnerRepository.create(dto);
            const savedPartner = await this.partnerRepository.save(partner);
            const { user, deletedAt, createdAt, updatedAt, ...rest } =
                savedPartner;
            return rest;
        } catch (error) {
            if (error.code === '23505') {
                throw new ConflictException('Partner already exists.');
            }
            throw new InternalServerErrorException();
        }
    }

    async updateOne(
        options: FindOneOptions<Partner>,
        dto: UpdatePartnerDto,
    ): Promise<UpdateOnePartnerResponseDto> {
        const oldPartner = await this.partnerRepository.findOne(options);
        if (!oldPartner) {
            throw new NotFoundException('Partner not found.');
        }
        try {
            const savedPartner = await this.partnerRepository.save({
                ...oldPartner,
                ...dto,
            });
            const { user, updatedAt, ...rest } = savedPartner;
            return rest;
        } catch (error) {
            if (error.code === '23505') {
                throw new ConflictException('Partner already exists.');
            }
            throw new InternalServerErrorException();
        }
    }

    async deleteMany(criteria: FindOptionsWhere<Partner>): Promise<void> {
        const updateResult = await this.partnerRepository.delete(criteria);
        if (updateResult.affected === 0) {
            throw new NotFoundException('Partner not found.');
        }
    }
}
