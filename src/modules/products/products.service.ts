import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from 'src/modules/products/dtos/product-request.dtos';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/modules/products/product.entity';
import {
    type FindManyOptions,
    type FindOneOptions,
    type FindOptionsWhere,
    Repository,
} from 'typeorm';
import { BaseProductDto } from 'src/modules/products/dtos/base-product.dto';
import { UpdateProductDto } from 'src/modules/products/dtos/product-request.dtos';
import { plainToInstance } from 'class-transformer';
import { PageOptionsDto } from 'src/common/dtos/page-options.dto';
import { PageMetaDto } from 'src/common/dtos/page-meta.dto';
import { PageDto } from 'src/common/dtos/page.dto';

@Injectable()
export class ProductsService {
    constructor(
        @InjectRepository(Product)
        private productRepository: Repository<Product>,
    ) {}

    async findOne(options: FindOneOptions<Product>): Promise<Product> {
        const product = await this.productRepository.findOne(options);
        if (!product) {
            throw new NotFoundException('Product not found.');
        }
        return plainToInstance(Product, product);
    }

    async findMany(
        pageOptionsDto: PageOptionsDto,
        options?: FindManyOptions<Product>,
    ): Promise<PageDto<Product>> {
        const products = await this.productRepository.find({
            ...options,
            order: { name: pageOptionsDto.order },
            skip: pageOptionsDto.skip,
            take: pageOptionsDto.take,
        });
        const pageMetaDto = new PageMetaDto({
            itemCount: products.length,
            pageOptionsDto,
        });
        return new PageDto(plainToInstance(Product, products), pageMetaDto);
    }

    async createOne(
        dto: CreateProductDto & { user: { id: number } },
    ): Promise<BaseProductDto> {
        const product = this.productRepository.create(dto);
        const savedProduct = await this.productRepository.save(product);
        return plainToInstance(Product, savedProduct);
    }

    async updateOne(
        options: FindOneOptions<Product>,
        dto: UpdateProductDto,
    ): Promise<BaseProductDto> {
        const oldProduct = await this.productRepository.findOne(options);
        if (!oldProduct) {
            throw new NotFoundException('Product not found.');
        }
        const savedProduct = await this.productRepository.save({
            ...oldProduct,
            ...dto,
        });
        return plainToInstance(Product, savedProduct);
    }

    async deleteMany(criteria: FindOptionsWhere<Product>): Promise<void> {
        const deleteResult = await this.productRepository.delete(criteria);
        if (deleteResult.affected === 0) {
            throw new NotFoundException('Product not found.');
        }
    }
}
