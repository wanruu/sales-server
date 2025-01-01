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
import { AuthGuard } from 'src/guards/auth.guard';
import { PartnersService } from 'src/services/partners.service';
import { User } from 'src/decorators/user.decorator';
import { CreatePartnerDto } from 'src/dtos/request/partner/create-partner.dto';
import { ApiExtraModels, ApiTags } from '@nestjs/swagger';
import {
    CreateOnePartnerApiResponses,
    DeleteOnePartnerApiResponses,
    FindManyPartnerApiResponses,
    FindOnePartnerApiResponses,
    UpdateOnePartnerApiResponses,
} from 'src/decorators/api-response/partner.api-response.decorator';
import { BasePartnerDto } from 'src/dtos/common/base-partner.dto';
import { FindOnePartnerResponseDto } from 'src/dtos/response/partner/find-one-partner.response.dto';
import { UpdatePartnerDto } from 'src/dtos/request/partner/update-partner.dto';
import { FindManyPartnerResponseDto } from 'src/dtos/response/partner/find-many-partner.response.dto';

@ApiTags('Partners')
@Controller('partners')
@UseGuards(AuthGuard)
@ApiExtraModels(
    BasePartnerDto,
    FindOnePartnerResponseDto,
    FindManyPartnerResponseDto,
)
export class PartnersController {
    constructor(private partnersService: PartnersService) {}

    @Get()
    @HttpCode(HttpStatus.OK)
    @FindManyPartnerApiResponses()
    async findAll(@User('id') userId: number) {
        const data = await this.partnersService.findMany({
            where: { user: { id: userId } },
        });
        return { data };
    }

    @Get(':id')
    @HttpCode(HttpStatus.OK)
    @FindOnePartnerApiResponses()
    async findById(
        @Param('id', new ParseIntPipe()) id: number,
        @User('id') userId: number,
    ) {
        const data = await this.partnersService.findOne({
            where: { id, user: { id: userId } },
        });
        return { data };
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @CreateOnePartnerApiResponses()
    async createOne(@Body() dto: CreatePartnerDto, @User('id') userId: number) {
        const data = await this.partnersService.createOne({
            ...dto,
            user: { id: userId },
        });
        return { data };
    }

    @Patch(':id')
    @HttpCode(HttpStatus.OK)
    @UpdateOnePartnerApiResponses()
    async updateById(
        @Param('id', new ParseIntPipe()) id: number,
        @Body() dto: UpdatePartnerDto,
        @User('id') userId: number,
    ) {
        const data = await this.partnersService.updateOne(
            { where: { id, user: { id: userId } } },
            dto,
        );
        return { data };
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    @DeleteOnePartnerApiResponses()
    deleteById(
        @Param('id', new ParseIntPipe()) id: number,
        @User('id') userId: number,
    ) {
        return this.partnersService.deleteMany({ id, user: { id: userId } });
    }
}
