import {
    ConflictException,
    Injectable,
    InternalServerErrorException,
    NotFoundException,
} from '@nestjs/common';
import {
    CreateProductDto,
    CreateOneProductResponseDto,
} from 'src/dtos/product/create-product.dto';
import {
    UpdateProductDto,
    UpdateOneProductResponseDto,
} from 'src/dtos/product/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/entities/product.entity';
import {
    type FindManyOptions,
    type FindOneOptions,
    type FindOptionsWhere,
    Repository,
} from 'typeorm';
import {
    FindManyProductResponseDto,
    FindOneProductResponseDto,
} from 'src/dtos/product/find-product.dto';

@Injectable()
export class ProductsService {
    constructor(
        @InjectRepository(Product)
        private productRepository: Repository<Product>,
    ) {}

    async findOne(
        options: FindOneOptions<Product>,
    ): Promise<FindOneProductResponseDto> {
        const product = await this.productRepository.findOne(options);
        if (!product) {
            throw new NotFoundException('Product not found.');
        }
        return product;
    }

    async findMany(
        options?: FindManyOptions<Product>,
    ): Promise<FindManyProductResponseDto[]> {
        const products = await this.productRepository.find(options);
        return products;
    }

    async createOne(
        dto: CreateProductDto & { user: { id: number } },
    ): Promise<CreateOneProductResponseDto> {
        try {
            const product = this.productRepository.create(dto);
            const savedProduct = await this.productRepository.save(product);
            const { user, deletedAt, createdAt, updatedAt, ...rest } =
                savedProduct;
            return rest;
        } catch (error) {
            if (error.code === '23505') {
                throw new ConflictException('Product already exists.');
            }
            throw new InternalServerErrorException();
        }
    }

    async updateOne(
        options: FindOneOptions<Product>,
        dto: UpdateProductDto,
    ): Promise<UpdateOneProductResponseDto> {
        const oldProduct = await this.productRepository.findOne(options);
        if (!oldProduct) {
            throw new NotFoundException('Product not found.');
        }
        try {
            const savedProduct = await this.productRepository.save({
                ...oldProduct,
                ...dto,
            });
            const { user, updatedAt, ...rest } = savedProduct;
            return rest;
        } catch (error) {
            if (error.code === '23505') {
                throw new ConflictException('Product already exists.');
            }
            throw new InternalServerErrorException();
        }
    }

    async deleteMany(criteria: FindOptionsWhere<Product>): Promise<void> {
        const updatedResult = await this.productRepository.delete(criteria);
        if (updatedResult.affected === 0) {
            throw new NotFoundException('Product not found.');
        }
    }
}
