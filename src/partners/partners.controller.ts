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
import { AuthGuard } from '../auth/auth.guard';
import { PartnerService } from './partners.service';
import { User } from 'src/decorators/user.decorator';
import { CreatePartnerDto } from './dto/create-partner.dto';
import { UpdatePartnerDto } from './dto/update-partner.dto';

@Controller('partners')
@UseGuards(AuthGuard)
export class PartnerController {
    constructor(private partnerService: PartnerService) {}

    @Get()
    @HttpCode(HttpStatus.OK)
    findAll(@User() user: number) {
        return this.partnerService.findAll(user);
    }

    @Get('/:id')
    @HttpCode(HttpStatus.OK)
    findOne(@Param('id') id: number, @User() user: number) {
        return this.partnerService.findById(id, user);
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    create(@Body() dto: CreatePartnerDto, @User() user: number) {
        return this.partnerService.create(dto, user);
    }

    @Patch('/:id')
    @HttpCode(HttpStatus.OK)
    update(
        @Param('id') id: number,
        @Body() dto: UpdatePartnerDto,
        @User() user: number,
    ) {
        return this.partnerService.update(id, dto, user);
    }
}
