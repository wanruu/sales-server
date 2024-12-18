import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Product } from './product.schema';
import { Decimal128, SchemaTypes, HydratedDocument } from 'mongoose';

export type InvoiceItemDocument = HydratedDocument<InvoiceItem>;

@Schema({ timestamps: true })
export class InvoiceItem {
    @Prop({ type: SchemaTypes.ObjectId, ref: Product.name, required: true })
    product: Product;

    @Prop({ type: SchemaTypes.Decimal128, min: 0, default: 0 })
    price: Decimal128;

    @Prop({ type: SchemaTypes.Decimal128, min: 0, default: 0 })
    quantity: Decimal128;

    @Prop({ type: SchemaTypes.Decimal128, min: 0, default: 0 })
    originalAmount: Decimal128;

    @Prop({ type: Number, min: 0, max: 100, default: 100, isInteger: true })
    discount: number;

    @Prop({ type: SchemaTypes.Decimal128, min: 0, default: 0 })
    amount: Decimal128;

    @Prop({ type: SchemaTypes.Decimal128, min: 0 })
    weight: Decimal128;

    @Prop({ type: String, trim: true })
    remark: string;

    @Prop({ type: Boolean, default: false })
    delivered: boolean;
}

export const InvoiceItemSchema = SchemaFactory.createForClass(InvoiceItem);
