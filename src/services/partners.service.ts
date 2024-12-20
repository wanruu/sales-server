import {
    ConflictException,
    Injectable,
    InternalServerErrorException,
    NotFoundException,
} from '@nestjs/common';
import { CreatePartnerDto } from 'src/dtos/partner/create-partner.dto';
import { UpdatePartnerDto } from 'src/dtos/partner/update-partner.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Partner } from 'src/entities/partner.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PartnersService {
    constructor(
        @InjectRepository(Partner)
        private partnerRepository: Repository<Partner>,
    ) {}

    async findById(id: string, userId: string): Promise<Partner> {
        const partner = await this.partnerRepository.findOneBy({ id });
        if (!partner || partner.user.id !== userId) {
            throw new NotFoundException('Partner not found.');
        }
        return partner;
    }

    async findAll(userId: string): Promise<Partner[]> {
        const partners = await this.partnerRepository.findBy({
            user: { id: userId },
        });
        return partners;
    }

    async create(dto: CreatePartnerDto, userId: string): Promise<Partner> {
        try {
            const partner = this.partnerRepository.create({
                ...dto,
                user: { id: userId },
            });
            return await this.partnerRepository.save(partner);
        } catch (error) {
            if (error.code === '23505') {
                throw new ConflictException('Partner already exists');
            }
            throw new InternalServerErrorException();
        }
    }

    async update(
        id: string,
        dto: UpdatePartnerDto,
        userId: string,
    ): Promise<Partner> {
        try {
            const oldPartner = await this.partnerRepository.findOneBy({ id });
            if (!oldPartner || oldPartner.user.id !== userId) {
                throw new NotFoundException('Partner not found.');
            }
            return await this.partnerRepository.save({ ...oldPartner, ...dto });
        } catch (error) {
            if (error.code === '23505') {
                throw new ConflictException('Partner already exists.');
            }
            throw new InternalServerErrorException();
        }
    }

    async delete(id: string, userId: string): Promise<void> {
        const updateResult = await this.partnerRepository.delete({
            id,
            user: { id: userId },
        });
        if (updateResult.affected === 0) {
            throw new NotFoundException('Partner not found.');
        }
    }
}
