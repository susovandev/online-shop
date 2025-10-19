import cloudinary from '../config/cloudinary.config.js';
import fs from 'node:fs';

class Cloudinary {
    constructor() {
        this.cloudinary = cloudinary;
    }

    async uploadToCloudinary(localFilePath) {
        try {
            if (!fs.existsSync(localFilePath)) {
                console.error(`File not found: ${localFilePath}`);
                throw new Error('File not found');
            }
            const uploadResponse = await this.cloudinary.uploader.upload(
                localFilePath,
                {
                    resource_type: 'image',
                    folder: 'uploads/images',
                }
            );

            if (!uploadResponse) {
                console.error(`Upload failed to cloudinary`);
                throw new Error('Upload failed to cloudinary');
            }
            return {
                public_id: uploadResponse?.public_id,
                secure_url: uploadResponse?.secure_url,
            };
        } catch (error) {
            console.error(`Error in uploadToCloudinary: ${error}`);
            throw new Error(error);
        } finally {
            fs.unlinkSync(localFilePath);
        }
    }

    async deleteFromCloudinary(publicId) {
        try {
            if (!publicId) {
                console.error(`Public id not found: ${publicId}`);
                throw new Error('Public id not found');
            }
            await this.cloudinary.uploader.destroy(publicId);
            console.log(`Image deleted from cloudinary: ${publicId}`);
        } catch (error) {
            console.error(`Error in deleteFromCloudinary: ${error}`);
            throw new Error(error);
        }
    }
}

export const cloudinaryService = new Cloudinary();
