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
import { ProductsService } from 'src/modules/products/products.service';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { CreateProductDto } from 'src/modules/products/dtos/product-request.dtos';
import { User } from 'src/common/decorators/user.decorator';
import {
    ApiConflictResponse,
    ApiCreatedResponse,
    ApiExtraModels,
    ApiNoContentResponse,
    ApiNotFoundResponse,
    ApiOkResponse,
    ApiOperation,
    ApiTags,
    getSchemaPath,
} from '@nestjs/swagger';
import { BaseProductDto } from 'src/modules/products/dtos/base-product.dto';
import { FindManyProductResponseDto } from 'src/modules/products/dtos/product-response.dtos';
import { FindOneProductResponseDto } from 'src/modules/products/dtos/product-response.dtos';
import { UpdateProductDto } from 'src/modules/products/dtos/product-request.dtos';
import { ApiCommonResponses } from 'src/common/decorators/api-common-responses.decorator';
import { ErrorResponseDto } from 'src/common/dtos/error-response.dto';

@ApiTags('Products')
@Controller('products')
@UseGuards(AuthGuard)
@ApiExtraModels(
    BaseProductDto,
    FindOneProductResponseDto,
    FindManyProductResponseDto,
)
export class ProductsController {
    constructor(private productsService: ProductsService) {}

    @Get()
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ operationId: 'find products' })
    @ApiCommonResponses()
    @ApiOkResponse({
        description: 'Returns all products.',
        schema: {
            properties: {
                data: {
                    type: 'array',
                    items: {
                        $ref: getSchemaPath(FindManyProductResponseDto),
                    },
                },
                meta: { type: 'object' },
            },
            required: ['data', 'meta'],
        },
    })
    async findAll(@User('id') userId: number) {
        const data = await this.productsService.findMany({
            where: { user: { id: userId } },
        });
        return { data };
    }

    @Get(':id')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ operationId: 'find a product' })
    @ApiCommonResponses()
    @ApiOkResponse({
        description: 'Returns the product with the given id.',
        schema: {
            properties: {
                data: {
                    $ref: getSchemaPath(FindOneProductResponseDto),
                },
            },
            required: ['data'],
        },
    })
    @ApiNotFoundResponse({
        description: 'Product not found.',
        type: ErrorResponseDto,
    })
    async findById(
        @Param('id', new ParseIntPipe()) id: number,
        @User('id') userId: number,
    ) {
        const data = await this.productsService.findOne({
            where: { id, user: { id: userId } },
        });
        return { data };
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @ApiOperation({ operationId: 'create a product' })
    @ApiCommonResponses()
    @ApiCreatedResponse({
        description: 'Returns the created product.',
        schema: {
            properties: {
                data: {
                    $ref: getSchemaPath(BaseProductDto),
                },
            },
            required: ['data'],
        },
    })
    @ApiConflictResponse({
        description: 'Product already exists.',
        type: ErrorResponseDto,
    })
    async createOne(@Body() dto: CreateProductDto, @User('id') userId: number) {
        const data = await this.productsService.createOne({
            ...dto,
            user: { id: userId },
        });
        return { data };
    }

    @Patch(':id')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ operationId: 'update a product' })
    @ApiCommonResponses()
    @ApiOkResponse({
        description: 'Returns the updated product.',
        schema: {
            properties: {
                data: {
                    $ref: getSchemaPath(BaseProductDto),
                },
            },
            required: ['data'],
        },
    })
    @ApiConflictResponse({
        description: 'Product already exists.',
        type: ErrorResponseDto,
    })
    @ApiNotFoundResponse({
        description: 'Product not found.',
        type: ErrorResponseDto,
    })
    async updateById(
        @Param('id', new ParseIntPipe()) id: number,
        @Body() dto: UpdateProductDto,
        @User('id') userId: number,
    ) {
        const data = await this.productsService.updateOne(
            { where: { id, user: { id: userId } } },
            dto,
        );
        return { data };
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
        type: ErrorResponseDto,
    })
    deleteById(
        @Param('id', new ParseIntPipe()) id: number,
        @User('id') userId: number,
    ) {
        return this.productsService.deleteMany({ id, user: { id: userId } });
    }
}
