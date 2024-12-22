import { PartialType } from '@nestjs/swagger';
import {
    CreateInvoiceDto,
    CreateOneInvoiceResponseDto,
} from './create-invoice.dto';

export class UpdateInvoiceDto extends PartialType(CreateInvoiceDto) {}

export class UpdateOneInvoiceResponseDto extends CreateOneInvoiceResponseDto {}
