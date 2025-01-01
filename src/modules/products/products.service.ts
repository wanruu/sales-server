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
        return product;
    }

    findMany(options?: FindManyOptions<Product>): Promise<Product[]> {
        return this.productRepository.find(options);
    }

    async createOne(
        dto: CreateProductDto & { user: { id: number } },
    ): Promise<BaseProductDto> {
        const product = this.productRepository.create(dto);
        const savedProduct = await this.productRepository.save(product);
        const { user, deletedAt, updatedAt, createdAt, ...rest } = savedProduct;
        return rest;
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
        const { user, updatedAt, ...rest } = savedProduct;
        return rest;
    }

    async deleteMany(criteria: FindOptionsWhere<Product>): Promise<void> {
        const deleteResult = await this.productRepository.delete(criteria);
        if (deleteResult.affected === 0) {
            throw new NotFoundException('Product not found.');
        }
    }
}
