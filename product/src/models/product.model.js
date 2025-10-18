import { Schema, model } from 'mongoose';

const fileSchema = new Schema({
    secure_url: { type: String, required: true },
    public_id: { type: String, required: true },
    createdAt: { type: Date, default: Date.now() },
});

const productSchema = new Schema(
    {
        title: {
            type: String,
            required: [true, 'Title is required'],
        },
        description: {
            type: String,
            required: [true, 'Description is required'],
        },
        price: {
            amount: {
                type: Number,
                required: [true, 'Amount is required'],
            },
            currency: {
                type: String,
                enum: ['USD', 'INR'],
                default: 'INR',
            },
        },
        seller: {
            type: Schema.Types.ObjectId,
            required: [true, 'Seller is required'],
        },
        images: [fileSchema],
    },
    { timestamps: true }
);

export const Product = model('Product', productSchema);
