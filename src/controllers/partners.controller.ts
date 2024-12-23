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
import {
    CreatePartnerDto,
    CreateOnePartnerResponseDto,
} from 'src/dtos/partner/create-partner.dto';
import {
    UpdatePartnerDto,
    UpdateOnePartnerResponseDto,
} from 'src/dtos/partner/update-partner.dto';
import { ApiTags } from '@nestjs/swagger';
import {
    CreateOnePartnerApiResponses,
    DeleteOnePartnerApiResponses,
    FindManyPartnerApiResponses,
    FindOnePartnerApiResponses,
    UpdateOnePartnerApiResponses,
} from 'src/decorators/api-response/partner.api-response.decorator';
import {
    FindManyPartnerResponseDto,
    FindOnePartnerResponseDto,
} from 'src/dtos/partner/find-partner.dto';

@ApiTags('Partners')
@Controller('partners')
@UseGuards(AuthGuard)
export class PartnersController {
    constructor(private partnersService: PartnersService) {}

    @Get()
    @HttpCode(HttpStatus.OK)
    @FindManyPartnerApiResponses()
    findAll(@User('id') userId: number): Promise<FindManyPartnerResponseDto[]> {
        return this.partnersService.findMany({
            where: { user: { id: userId } },
        });
    }

    @Get(':id')
    @HttpCode(HttpStatus.OK)
    @FindOnePartnerApiResponses()
    findById(
        @Param('id', new ParseIntPipe()) id: number,
        @User('id') userId: number,
    ): Promise<FindOnePartnerResponseDto> {
        return this.partnersService.findOne({
            where: { id, user: { id: userId } },
        });
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @CreateOnePartnerApiResponses()
    createOne(
        @Body() dto: CreatePartnerDto,
        @User('id') userId: number,
    ): Promise<CreateOnePartnerResponseDto> {
        return this.partnersService.createOne({ ...dto, user: { id: userId } });
    }

    @Patch(':id')
    @HttpCode(HttpStatus.OK)
    @UpdateOnePartnerApiResponses()
    updateById(
        @Param('id', new ParseIntPipe()) id: number,
        @Body() dto: UpdatePartnerDto,
        @User('id') userId: number,
    ): Promise<UpdateOnePartnerResponseDto> {
        return this.partnersService.updateOne(
            { where: { id, user: { id: userId } } },
            dto,
        );
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    @DeleteOnePartnerApiResponses()
    deleteById(
        @Param('id', new ParseIntPipe()) id: number,
        @User('id') userId: number,
    ): Promise<void> {
        return this.partnersService.deleteMany({ id, user: { id: userId } });
    }
}
