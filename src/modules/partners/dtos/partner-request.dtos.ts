import { IntersectionType, PartialType, PickType } from '@nestjs/swagger';
import { BasePartnerDto } from './base-partner.dto';

export class CreatePartnerDto extends IntersectionType(
    PartialType(
        PickType(BasePartnerDto, ['phone', 'address', 'folder'] as const),
    ),
    PickType(BasePartnerDto, ['name'] as const),
) {}

export class UpdatePartnerDto extends PartialType(CreatePartnerDto) {}
