import { PartialType } from '@nestjs/swagger';
import {
    CreateInvoiceItemDto,
    CreateOneInvoiceItemResponseDto,
} from './create-invoice-item.dto';

export class UpdateInvoiceItemDto extends PartialType(CreateInvoiceItemDto) {}

export class UpdateOneInvoiceItemResponseDto extends CreateOneInvoiceItemResponseDto {}
