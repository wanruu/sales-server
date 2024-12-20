import {
    ConflictException,
    Injectable,
    InternalServerErrorException,
    NotFoundException,
} from '@nestjs/common';
import { CreateProductDto } from 'src/dtos/product/create-product.dto';
import { UpdateProductDto } from 'src/dtos/product/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/entities/product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductsService {
    constructor(
        @InjectRepository(Product)
        private productRepository: Repository<Product>,
    ) {}

    async findById(id: string, userId: string): Promise<Product> {
        const product = await this.productRepository.findOneBy({ id });
        if (!product || product.user.id !== userId) {
            throw new NotFoundException('Product not found.');
        }
        return product;
    }

    async findAll(userId: string): Promise<Product[]> {
        const products = await this.productRepository.findBy({
            user: { id: userId },
        });
        return products;
    }

    async create(dto: CreateProductDto, userId: string): Promise<Product> {
        try {
            const product = this.productRepository.create({
                ...dto,
                user: { id: userId },
            });
            return await this.productRepository.save(product);
        } catch (error) {
            if (error.code === '23505') {
                throw new ConflictException('Product already exists.');
            }
            throw new InternalServerErrorException();
        }
    }

    async update(
        id: string,
        dto: UpdateProductDto,
        userId: string,
    ): Promise<Product> {
        try {
            const oldProduct = await this.productRepository.findOneBy({ id });
            if (!oldProduct || oldProduct.user.id !== userId) {
                throw new NotFoundException('Product not found.');
            }
            return await this.productRepository.save({ ...oldProduct, ...dto });
        } catch (error) {
            if (error.code === '23505') {
                throw new ConflictException('Product already exists.');
            }
            throw new InternalServerErrorException();
        }
    }

    async delete(id: string, userId: string): Promise<void> {
        const updatedResult = await this.productRepository.delete({
            id,
            user: { id: userId },
        });
        if (updatedResult.affected === 0) {
            throw new NotFoundException('Product not found.');
        }
    }
}
