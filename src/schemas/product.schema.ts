import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SchemaTypes } from 'mongoose';
import { User } from './user.schema';

@Schema({ timestamps: true })
export class Product {
    @Prop({ type: String, trim: true })
    material: string;

    @Prop({ type: String, required: true, trim: true })
    name: string;

    @Prop({ type: String, required: true, trim: true })
    spec: string;

    @Prop({ type: String, required: true, trim: true })
    unit: string;

    @Prop({
        type: SchemaTypes.ObjectId,
        ref: User.name,
        required: true,
    })
    user: User;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
ProductSchema.index(
    { material: 1, name: 1, spec: 1, user: 1 },
    { unique: true },
);
