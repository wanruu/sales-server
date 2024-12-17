import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SchemaTypes } from 'mongoose';
import { User } from './user.schema';

@Schema({ timestamps: true })
export class Partner {
    @Prop({ type: String, required: true, trim: true })
    name: string;

    @Prop({ type: String, trim: true })
    phone: string;

    @Prop({ type: String, trim: true })
    address: string;

    @Prop({ type: String, trim: true })
    folder: string;

    @Prop({ type: SchemaTypes.ObjectId, ref: User.name, required: true })
    user: User;
}

export const PartnerSchema = SchemaFactory.createForClass(Partner);
PartnerSchema.index({ name: 1, user: 1 }, { unique: true });
