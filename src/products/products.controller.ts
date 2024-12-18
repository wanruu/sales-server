import {
    Body,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    Patch,
    Post,
    UseGuards,
} from '@nestjs/common';
import { ProductService } from './products.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { User } from 'src/decorators/user.decorator';

@Controller('products')
@UseGuards(AuthGuard)
export class ProductController {
    constructor(private productService: ProductService) {}

    @Get()
    @HttpCode(HttpStatus.OK)
    findAll(@User('id') userId: number) {
        return this.productService.findAll(userId);
    }

    @Get(':id')
    @HttpCode(HttpStatus.OK)
    findById(@Param('id') id: number, @User('id') userId: number) {
        return this.productService.findById(id, userId);
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    create(@Body() dto: CreateProductDto, @User('id') userId: number) {
        return this.productService.create(dto, userId);
    }

    @Patch(':id')
    @HttpCode(HttpStatus.OK)
    update(
        @Param('id') id: number,
        @Body() dto: UpdateProductDto,
        @User('id') userId: number,
    ) {
        return this.productService.update(id, dto, userId);
    }
}
