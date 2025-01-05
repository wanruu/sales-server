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
    Query,
    UseGuards,
} from '@nestjs/common';
import { ProductsService } from 'src/modules/products/products.service';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { CreateProductDto } from 'src/modules/products/dtos/product-request.dtos';
import { User } from 'src/common/decorators/user.decorator';
import {
    ApiConflictResponse,
    ApiCreatedResponse,
    ApiNoContentResponse,
    ApiNotFoundResponse,
    ApiOkResponse,
    ApiOperation,
    ApiTags,
} from '@nestjs/swagger';
import { BaseProductDto } from 'src/modules/products/dtos/base-product.dto';
import { FindManyProductResponseDto } from 'src/modules/products/dtos/product-response.dtos';
import { FindOneProductResponseDto } from 'src/modules/products/dtos/product-response.dtos';
import { UpdateProductDto } from 'src/modules/products/dtos/product-request.dtos';
import { ApiCommonResponses } from 'src/common/decorators/api-common-responses.decorator';
import { ErrorDto } from 'src/common/dtos/error.dto';
import { PageOptionsDto } from 'src/common/dtos/page-options.dto';
import { ApiPaginatedResponse } from 'src/common/decorators/api-paginated-response.decorator';

@ApiTags('Products')
@Controller('products')
@UseGuards(AuthGuard)
export class ProductsController {
    constructor(private productsService: ProductsService) {}

    @Get()
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ operationId: 'find products' })
    @ApiCommonResponses()
    @ApiPaginatedResponse(FindManyProductResponseDto)
    findAll(
        @Query() pageOptionsDto: PageOptionsDto,
        @User('id') userId: number,
    ) {
        return this.productsService.findMany(pageOptionsDto, {
            where: { user: { id: userId } },
        });
    }

    @Get(':id')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ operationId: 'find a product' })
    @ApiCommonResponses()
    @ApiOkResponse({
        description: 'Returns the product with the given id.',
        type: FindOneProductResponseDto,
    })
    @ApiNotFoundResponse({
        description: 'Product not found.',
        type: ErrorDto,
    })
    findById(
        @Param('id', new ParseIntPipe()) id: number,
        @User('id') userId: number,
    ) {
        return this.productsService.findOne({
            where: { id, user: { id: userId } },
        });
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @ApiOperation({ operationId: 'create a product' })
    @ApiCommonResponses()
    @ApiCreatedResponse({
        description: 'Returns the created product.',
        type: BaseProductDto,
    })
    @ApiConflictResponse({
        description: 'Product already exists.',
        type: ErrorDto,
    })
    createOne(@Body() dto: CreateProductDto, @User('id') userId: number) {
        return this.productsService.createOne({
            ...dto,
            user: { id: userId },
        });
    }

    @Patch(':id')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ operationId: 'update a product' })
    @ApiCommonResponses()
    @ApiOkResponse({
        description: 'Returns the updated product.',
        type: BaseProductDto,
    })
    @ApiConflictResponse({
        description: 'Product already exists.',
        type: ErrorDto,
    })
    @ApiNotFoundResponse({
        description: 'Product not found.',
        type: ErrorDto,
    })
    updateById(
        @Param('id', new ParseIntPipe()) id: number,
        @Body() dto: UpdateProductDto,
        @User('id') userId: number,
    ) {
        return this.productsService.updateOne(
            { where: { id, user: { id: userId } } },
            dto,
        );
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    @ApiOperation({ operationId: 'delete a product' })
    @ApiCommonResponses()
    @ApiNoContentResponse({
        description: 'Product deleted successfully.',
        content: { 'text/plain': {} },
    })
    @ApiNotFoundResponse({
        description: 'Product not found.',
        type: ErrorDto,
    })
    deleteById(
        @Param('id', new ParseIntPipe()) id: number,
        @User('id') userId: number,
    ) {
        return this.productsService.deleteMany({ id, user: { id: userId } });
    }
}
