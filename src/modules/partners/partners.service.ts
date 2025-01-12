import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePartnerDto } from 'src/modules/partners/dtos/partner-request.dtos';
import { InjectRepository } from '@nestjs/typeorm';
import { Partner } from 'src/modules/partners/partner.entity';
import { type FindOptionsWhere, Repository } from 'typeorm';
import { BasePartnerDto } from 'src/modules/partners/dtos/base-partner.dto';
import { UpdatePartnerDto } from 'src/modules/partners/dtos/partner-request.dtos';
import { plainToInstance } from 'class-transformer';
import { PageOptionsDto } from 'src/common/dtos/page-options.dto';
import { PageMetaDto } from 'src/common/dtos/page-meta.dto';
import { PageDto } from 'src/common/dtos/page.dto';
import {
    FindManyPartnerResponseDto,
    FindOnePartnerResponseDto,
} from './dtos/partner-response.dtos';

@Injectable()
export class PartnersService {
    constructor(
        @InjectRepository(Partner)
        private partnerRepository: Repository<Partner>,
    ) {}

    async findOne(
        where: FindOptionsWhere<Partner>,
    ): Promise<FindOnePartnerResponseDto> {
        const partner = await this.partnerRepository
            .createQueryBuilder()
            .where(where)
            .leftJoin('Invoice', 'Invoice', 'Partner.id = Invoice.partnerId')
            .groupBy('Partner.id')
            .select([
                'Partner.id as id',
                'Partner.name as name',
                'Partner.phone as phone',
                'Partner.address as address',
                'Partner.folder as folder',
                'COUNT(Invoice.id) = 0 as deletable',
            ])
            .getRawOne();
        if (!partner) {
            throw new NotFoundException('Partner not found.');
        }
        return plainToInstance(FindOnePartnerResponseDto, partner, {
            excludeExtraneousValues: true,
        });
    }

    async findMany(
        where: FindOptionsWhere<Partner>,
        pageOptionsDto: PageOptionsDto,
    ): Promise<PageDto<FindManyPartnerResponseDto>> {
        const partners = await this.partnerRepository
            .createQueryBuilder()
            .where(where)
            .leftJoin('Invoice', 'Invoice', 'Partner.id = Invoice.partnerId')
            .groupBy('Partner.id')
            .select([
                'Partner.id as id',
                'Partner.name as name',
                'Partner.phone as phone',
                'Partner.address as address',
                'Partner.folder as folder',
                'COUNT(Invoice.id) = 0 as deletable',
            ])
            .orderBy('Partner.createdAt', pageOptionsDto.order)
            .skip(pageOptionsDto.skip)
            .take(pageOptionsDto.take)
            .getRawMany();

        const pageMetaDto = new PageMetaDto({
            itemCount: partners.length,
            pageOptionsDto,
        });
        return new PageDto(
            plainToInstance(FindManyPartnerResponseDto, partners, {
                excludeExtraneousValues: true,
            }),
            pageMetaDto,
        );
    }

    async createOne(
        dto: CreatePartnerDto & { user: { id: number } },
    ): Promise<BasePartnerDto> {
        const partner = this.partnerRepository.create(dto);
        const savedPartner = await this.partnerRepository.save(partner);
        return plainToInstance(BasePartnerDto, savedPartner, {
            excludeExtraneousValues: true,
        });
    }

    async updateOne(
        where: FindOptionsWhere<Partner>,
        dto: UpdatePartnerDto,
    ): Promise<BasePartnerDto> {
        const oldPartner = await this.partnerRepository.findOneBy(where);
        if (!oldPartner) {
            throw new NotFoundException('Partner not found.');
        }

        const newPartner = { ...oldPartner };
        Object.entries(dto).forEach(([key, value]) => {
            if (value !== undefined) newPartner[key] = value;
        });

        const savedPartner = await this.partnerRepository.save(newPartner);
        return plainToInstance(BasePartnerDto, savedPartner, {
            excludeExtraneousValues: true,
        });
    }

    async deleteMany(where: FindOptionsWhere<Partner>): Promise<void> {
        const deleteResult = await this.partnerRepository.delete(where);
        if (deleteResult.affected === 0) {
            throw new NotFoundException('Partner not found.');
        }
    }
}
