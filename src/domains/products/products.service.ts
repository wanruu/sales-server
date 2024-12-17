import {
    ConflictException,
    Injectable,
    InternalServerErrorException,
    NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model } from 'mongoose';
import { Product } from 'src/schemas/product.schema';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductService {
    constructor(
        @InjectModel(Product.name) private productModel: Model<Product>,
    ) {}

    async findById(id: string, user: string) {
        if (!isValidObjectId(id)) {
            throw new NotFoundException('Product not found.');
        }
        const product = await this.productModel.findById(id).exec();
        if (!product || product.user.toString() !== user) {
            throw new NotFoundException('Product not found.');
        }
        return product;
    }

    async findAll(user: string) {
        const products = await this.productModel.find({ user }).exec();
        return products;
    }

    async create(dto: CreateProductDto, user: string) {
        try {
            const product = new this.productModel({ ...dto, user });
            return await product.save();
        } catch (error) {
            if (error.code === 11000) {
                throw new ConflictException('Product already exists.');
            }
            throw new InternalServerErrorException(error.message);
        }
    }

    async update(id: string, dto: UpdateProductDto, user: string) {
        if (!isValidObjectId(id)) {
            throw new NotFoundException('Product not found.');
        }
        const product = await this.productModel.findById(id).exec();
        if (!product || product.user.toString() !== user) {
            throw new NotFoundException('Product not found.');
        }

        try {
            const updatedProduct = await this.productModel
                .findByIdAndUpdate(id, dto, { new: true })
                .exec();
            return updatedProduct;
        } catch (error) {
            console.log(error);
            if (error.code === 11000) {
                throw new ConflictException('Product already exists.');
            }
            throw new InternalServerErrorException(error.message);
        }
    }
}
