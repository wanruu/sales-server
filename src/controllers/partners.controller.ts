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
import { AuthGuard } from 'src/guards/auth.guard';
import { PartnersService } from 'src/services/partners.service';
import { User } from 'src/decorators/user.decorator';
import { CreatePartnerDto } from 'src/dtos/partner/create-partner.dto';
import { UpdatePartnerDto } from 'src/dtos/partner/update-partner.dto';

@Controller('partners')
@UseGuards(AuthGuard)
export class PartnersController {
    constructor(private partnersService: PartnersService) {}

    @Get()
    @HttpCode(HttpStatus.OK)
    findAll(@User('id') userId: number) {
        return this.partnersService.findAll(userId);
    }

    @Get(':id')
    @HttpCode(HttpStatus.OK)
    findOne(@Param('id') id: number, @User('id') userId: number) {
        return this.partnersService.findById(id, userId);
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    create(@Body() dto: CreatePartnerDto, @User('id') userId: number) {
        return this.partnersService.create(dto, userId);
    }

    @Patch(':id')
    @HttpCode(HttpStatus.OK)
    update(
        @Param('id') id: number,
        @Body() dto: UpdatePartnerDto,
        @User('id') userId: number,
    ) {
        return this.partnersService.update(id, dto, userId);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    delete(@Param('id') id: number, @User('id') userId: number) {
        return this.partnersService.delete(id, userId);
    }
}
