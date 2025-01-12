import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from 'src/modules/products/dtos/product-request.dtos';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/modules/products/product.entity';
import { type FindOptionsWhere, Repository } from 'typeorm';
import { BaseProductDto } from 'src/modules/products/dtos/base-product.dto';
import { UpdateProductDto } from 'src/modules/products/dtos/product-request.dtos';
import { plainToInstance } from 'class-transformer';
import { PageOptionsDto } from 'src/common/dtos/page-options.dto';
import { PageMetaDto } from 'src/common/dtos/page-meta.dto';
import { PageDto } from 'src/common/dtos/page.dto';
import {
    FindManyProductResponseDto,
    FindOneProductResponseDto,
} from './dtos/product-response.dtos';

@Injectable()
export class ProductsService {
    constructor(
        @InjectRepository(Product)
        private productRepository: Repository<Product>,
    ) {}

    async findOne(
        where: FindOptionsWhere<Product>,
    ): Promise<FindOneProductResponseDto> {
        const product = await this.productRepository
            .createQueryBuilder()
            .where(where)
            .leftJoin(
                'InvoiceItem',
                'InvoiceItem',
                'InvoiceItem.productId = Product.id',
            )
            .groupBy('Product.id')
            .select([
                'Product.id as id',
                'Product.material as material',
                'Product.name as name',
                'Product.spec as spec',
                'Product.unit as unit',
                'Product.quantity as quantity',
                'COUNT(InvoiceItem.id) = 0 as deletable',
            ])
            .getRawOne();
        if (!product) {
            throw new NotFoundException('Product not found.');
        }
        return plainToInstance(FindOneProductResponseDto, product, {
            excludeExtraneousValues: true,
        });
    }

    async findMany(
        where: FindOptionsWhere<Product>,
        pageOptionsDto: PageOptionsDto,
    ): Promise<PageDto<FindManyProductResponseDto>> {
        const products = await this.productRepository
            .createQueryBuilder()
            .where(where)
            .leftJoin(
                'InvoiceItem',
                'InvoiceItem',
                'InvoiceItem.productId = Product.id',
            )
            .groupBy('Product.id')
            .select([
                'Product.id as id',
                'Product.material as material',
                'Product.name as name',
                'Product.spec as spec',
                'Product.unit as unit',
                'Product.quantity as quantity',
                'COUNT(InvoiceItem.id) = 0 as deletable',
            ])
            .orderBy('Product.name', pageOptionsDto.order)
            .skip(pageOptionsDto.skip)
            .take(pageOptionsDto.take)
            .getRawMany();
        const pageMetaDto = new PageMetaDto({
            itemCount: products.length,
            pageOptionsDto,
        });
        return new PageDto(
            plainToInstance(FindManyProductResponseDto, products, {
                excludeExtraneousValues: true,
            }),
            pageMetaDto,
        );
    }

    async createOne(
        dto: CreateProductDto & { user: { id: number } },
    ): Promise<BaseProductDto> {
        const product = this.productRepository.create(dto);
        const savedProduct = await this.productRepository.save(product);
        return plainToInstance(BaseProductDto, savedProduct, {
            excludeExtraneousValues: true,
        });
    }

    async updateOne(
        where: FindOptionsWhere<Product>,
        dto: UpdateProductDto,
    ): Promise<BaseProductDto> {
        const oldProduct = await this.productRepository.findOneBy(where);
        if (!oldProduct) {
            throw new NotFoundException('Product not found.');
        }

        const newProduct = { ...oldProduct };
        Object.entries(dto).forEach(([key, value]) => {
            if (value !== undefined) newProduct[key] = value;
        });

        const savedProduct = await this.productRepository.save(newProduct);
        return plainToInstance(BaseProductDto, savedProduct, {
            excludeExtraneousValues: true,
        });
    }

    async deleteMany(where: FindOptionsWhere<Product>): Promise<void> {
        const deleteResult = await this.productRepository.delete(where);
        if (deleteResult.affected === 0) {
            throw new NotFoundException('Product not found.');
        }
    }
}
