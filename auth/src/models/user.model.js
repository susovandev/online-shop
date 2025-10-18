import { Schema, model } from 'mongoose';
import { addressSchema } from './address.model';

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: [true, 'Username is required'],
            trim: true,
            unique: [true, 'Username already exists'],
        },
        email: {
            type: String,
            required: [true, 'Email is required'],
            trim: true,
            unique: [true, 'Email already exists'],
        },
        password: {
            type: String,
            required: [true, 'Password is required'],
            trim: true,
            minLength: [6, 'Password must be at least 6 characters long'],
        },
        fullName: {
            firstName: {
                type: String,
                required: [true, 'First name is required'],
            },
            lastName: {
                type: String,
                required: [true, 'Last name is required'],
            },
        },
        role: {
            type: String,
            enum: ['user', 'seller', 'admin'],
            default: 'user',
        },
        addresses: [addressSchema],
    },
    { timestamps: true }
);

export const User = model('User', userSchema);
