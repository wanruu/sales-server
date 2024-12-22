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
import {
    CreateProductDto,
    CreateOneProductResponseDto,
} from 'src/dtos/product/create-product.dto';
import {
    UpdateProductDto,
    UpdateOneProductResponseDto,
} from 'src/dtos/product/update-product.dto';
import { User } from 'src/decorators/user.decorator';
import { ApiTags } from '@nestjs/swagger';
import {
    CreateOneProductApiResponses,
    DeleteOneProductApiResponses,
    FindManyProductApiResponses,
    FindOneProductApiResponses,
    UpdateOneProductApiResponses,
} from 'src/decorators/api-response/product.api-response.decorator';
import {
    FindManyProductResponseDto,
    FindOneProductResponseDto,
} from 'src/dtos/product/find-product.dto';

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
    ): Promise<CreateOneProductResponseDto> {
        return this.productsService.createOne({ ...dto, user: { id: userId } });
    }

    @Patch(':id')
    @HttpCode(HttpStatus.OK)
    @UpdateOneProductApiResponses()
    updateById(
        @Param('id', new ParseIntPipe()) id: number,
        @Body() dto: UpdateProductDto,
        @User('id') userId: number,
    ): Promise<UpdateOneProductResponseDto> {
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
