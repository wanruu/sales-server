import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entity/product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(Product)
        private productRepository: Repository<Product>,
    ) {}

    async findById(id: number, user: number) {
        // if (!isValidObjectId(id)) {
        //     throw new NotFoundException('Product not found.');
        // }
        // const product = await this.productModel.findById(id).exec();
        // if (!product || product.user.toString() !== user) {
        //     throw new NotFoundException('Product not found.');
        // }
        // return product;
    }

    async findAll(user: number) {
        // const products = await this.productModel.find({ user }).exec();
        // return products;
    }

    async create(dto: CreateProductDto, user: number) {
        // try {
        //     const product = new this.productModel({ ...dto, user });
        //     return await product.save();
        // } catch (error) {
        //     if (error.code === 11000) {
        //         throw new ConflictException('Product already exists.');
        //     }
        //     throw new InternalServerErrorException(error.message);
        // }
    }

    async update(id: number, dto: UpdateProductDto, user: number) {
        // if (!isValidObjectId(id)) {
        //     throw new NotFoundException('Product not found.');
        // }
        // const product = await this.productModel.findById(id).exec();
        // if (!product || product.user.toString() !== user) {
        //     throw new NotFoundException('Product not found.');
        // }
        // try {
        //     const updatedProduct = await this.productModel
        //         .findByIdAndUpdate(id, dto, { new: true })
        //         .exec();
        //     return updatedProduct;
        // } catch (error) {
        //     console.log(error);
        //     if (error.code === 11000) {
        //         throw new ConflictException('Product already exists.');
        //     }
        //     throw new InternalServerErrorException(error.message);
        // }
    }
}
