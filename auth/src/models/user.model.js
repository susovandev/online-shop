import { Schema, model } from 'mongoose';
import { addressSchema } from './address.model.js';
import bcrypt from 'bcryptjs';

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
            select: false,
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

userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

userSchema.methods.comparePassword = async function (password) {
    return bcrypt.compare(password, this.password);
};
export const User = model('User', userSchema);
