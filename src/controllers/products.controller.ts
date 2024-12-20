import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    Patch,
    Post,
    UseGuards,
} from '@nestjs/common';
import { ProductsService } from 'src/services/products.service';
import { AuthGuard } from 'src/guards/auth.guard';
import { CreateProductDto } from 'src/dtos/product/create-product.dto';
import { UpdateProductDto } from 'src/dtos/product/update-product.dto';
import { User } from 'src/decorators/user.decorator';

@Controller('products')
@UseGuards(AuthGuard)
export class ProductsController {
    constructor(private productsService: ProductsService) {}

    @Get()
    @HttpCode(HttpStatus.OK)
    findAll(@User('id') userId: string) {
        return this.productsService.findAll(userId);
    }

    @Get(':id')
    @HttpCode(HttpStatus.OK)
    findById(@Param('id') id: string, @User('id') userId: string) {
        return this.productsService.findById(id, userId);
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    create(@Body() dto: CreateProductDto, @User('id') userId: string) {
        return this.productsService.create(dto, userId);
    }

    @Patch(':id')
    @HttpCode(HttpStatus.OK)
    update(
        @Param('id') id: string,
        @Body() dto: UpdateProductDto,
        @User('id') userId: string,
    ) {
        return this.productsService.update(id, dto, userId);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    delete(@Param('id') id: string, @User('id') userId: string) {
        return this.productsService.delete(id, userId);
    }
}
