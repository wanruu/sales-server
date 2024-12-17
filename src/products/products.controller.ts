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
    findAll(@User() user: string) {
        return this.productService.findAll(user);
    }

    @Get(':id')
    @HttpCode(HttpStatus.OK)
    findById(@Param('id') id: string, @User() user: string) {
        return this.productService.findById(id, user);
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    create(@Body() dto: CreateProductDto, @User() user: string) {
        return this.productService.create(dto, user);
    }

    @Patch(':id')
    @HttpCode(HttpStatus.OK)
    update(
        @Param('id') id: string,
        @Body() dto: UpdateProductDto,
        @User() user: string,
    ) {
        return this.productService.update(id, dto, user);
    }
}
