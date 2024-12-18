import {
    ConflictException,
    Injectable,
    InternalServerErrorException,
    NotFoundException,
} from '@nestjs/common';
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

    async findById(id: number, userId: number): Promise<Partner> {
        const partner = await this.partnerRepository.findOneBy({ id });
        if (!partner || partner.user.id !== userId) {
            throw new NotFoundException('Partner not found.');
        }
        return partner;
    }

    async findAll(userId: number): Promise<Partner[]> {
        const partners = await this.partnerRepository.findBy({
            user: { id: userId },
        });
        return partners;
    }

    async create(dto: CreatePartnerDto, userId: number): Promise<Partner> {
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

    async update(id: number, dto: UpdatePartnerDto, userId: number) {
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
}
