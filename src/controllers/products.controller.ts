import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    ParseIntPipe,
    Patch,
    Post,
    UseGuards,
} from '@nestjs/common';
import { ProductsService } from 'src/services/products.service';
import { AuthGuard } from 'src/guards/auth.guard';
import { CreateProductDto } from 'src/dtos/request/product/create-product.dto';
import { User } from 'src/decorators/user.decorator';
import { ApiTags } from '@nestjs/swagger';
import {
    CreateOneProductApiResponses,
    DeleteOneProductApiResponses,
    FindManyProductApiResponses,
    FindOneProductApiResponses,
    UpdateOneProductApiResponses,
} from 'src/decorators/api-response/product.api-response.decorator';
import { BaseProductDto } from 'src/dtos/common/base-product.dto';
import { FindManyProductResponseDto } from 'src/dtos/response/product/find-many-product.response.dto';
import { FindOneProductResponseDto } from 'src/dtos/response/product/find-one-product.response.dto';
import { UpdateProductDto } from 'src/dtos/request/product/update-product.dto';

@ApiTags('Products')
@Controller('products')
@UseGuards(AuthGuard)
export class ProductsController {
    constructor(private productsService: ProductsService) {}

    @Get()
    @HttpCode(HttpStatus.OK)
    @FindManyProductApiResponses()
    findAll(@User('id') userId: number): Promise<FindManyProductResponseDto[]> {
        return this.productsService.findMany({
            where: { user: { id: userId } },
        });
    }

    @Get(':id')
    @HttpCode(HttpStatus.OK)
    @FindOneProductApiResponses()
    findById(
        @Param('id', new ParseIntPipe()) id: number,
        @User('id') userId: number,
    ): Promise<FindOneProductResponseDto> {
        return this.productsService.findOne({
            where: { id, user: { id: userId } },
        });
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @CreateOneProductApiResponses()
    createOne(
        @Body() dto: CreateProductDto,
        @User('id') userId: number,
    ): Promise<BaseProductDto> {
        return this.productsService.createOne({ ...dto, user: { id: userId } });
    }

    @Patch(':id')
    @HttpCode(HttpStatus.OK)
    @UpdateOneProductApiResponses()
    updateById(
        @Param('id', new ParseIntPipe()) id: number,
        @Body() dto: UpdateProductDto,
        @User('id') userId: number,
    ): Promise<BaseProductDto> {
        return this.productsService.updateOne(
            { where: { id, user: { id: userId } } },
            dto,
        );
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    @DeleteOneProductApiResponses()
    deleteById(
        @Param('id', new ParseIntPipe()) id: number,
        @User('id') userId: number,
    ): Promise<void> {
        return this.productsService.deleteMany({ id, user: { id: userId } });
    }
}
