import { Document, Schema, model, models } from 'mongoose';

export interface IUser extends Document {
    username: string;
    password: string;
    name: string;
    email: string;
    photo_url: string;
    phone_number: String,
    roles: String[];
    token: string;
    exp_token: Date;
    create_at: Date;
}

export const UserSchema = new Schema<IUser>({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    photo_url: { type: String, required: false, default: "" },
    phone_number: { type: String, required: false, default: "" },
    roles: { type: [String], required: false },
    token: { type: String, required: false, default: "" },
    exp_token: { type: Date, required: false },
    create_at: { type: Date, default: Date.now }
});

const User = model<IUser>('User', UserSchema);

export default User;