import { PartialType } from '@nestjs/swagger';
import {
    CreatePartnerDto,
    CreateOnePartnerResponseDto,
} from './create-partner.dto';

export class UpdatePartnerDto extends PartialType(CreatePartnerDto) {}
export class UpdateOnePartnerResponseDto extends CreateOnePartnerResponseDto {}
