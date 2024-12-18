import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Decimal128, HydratedDocument, SchemaTypes } from 'mongoose';
import { User } from './user.schema';
import { Partner } from './partner.schema';
import { InvoiceItem } from './invoice-item.schema';

export type InvoiceDocument = HydratedDocument<Invoice>;

enum InvoiceType {
    salesOrder,
    purchaseOrder,
    salesRefund,
    purchaseRefund,
}

@Schema({ timestamps: true })
export class Invoice {
    @Prop({ type: String, required: true })
    _id: string;

    @Prop({ type: InvoiceType, required: true, enum: InvoiceType })
    type: InvoiceType;

    @Prop({ type: SchemaTypes.ObjectId, ref: Partner.name, required: true })
    partner: Partner;

    @Prop({ type: SchemaTypes.Decimal128, min: 0, default: 0 })
    amount: Decimal128;

    @Prop({ type: SchemaTypes.Decimal128, min: 0, default: 0 })
    prepayment: Decimal128;

    @Prop({ type: SchemaTypes.Decimal128, min: 0, default: 0 })
    payment: Decimal128;

    @Prop({ type: Boolean, default: false })
    delivered: boolean;

    @Prop({
        type: [{ type: SchemaTypes.ObjectId, ref: InvoiceItem.name }],
        default: [],
    })
    items: InvoiceItem[];

    @Prop({ type: SchemaTypes.ObjectId, ref: Invoice.name })
    relatedInvoice: Invoice;

    @Prop({ type: SchemaTypes.ObjectId, ref: User.name, required: true })
    user: User;
}

export const InvoiceSchema = SchemaFactory.createForClass(Invoice);
InvoiceSchema.index({ _id: 1, type: 1, user: 1 }, { unique: true });
