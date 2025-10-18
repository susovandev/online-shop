import { User as userModel } from '../models/user.model.js';
import { ApiError } from '../utils/apiError.js';
import { ApiResponse } from '../utils/apiResponse.js';

class AddressController {
    async getUserAddresses(req, res, next) {
        try {
            const { sub } = req.user;
            const user = await userModel.findById(sub);
            if (!user) {
                throw new ApiError(404, 'User not found');
            }
            res.status(200).json(
                new ApiResponse(200, 'Success', user?.addresses)
            );
        } catch (error) {
            console.error(error);
            next(error);
        }
    }

    async addUserAddress(req, res, next) {
        try {
            const { sub } = req.user;
            const { street, city, state, zip, country } = req.body;

            await userModel.findOneAndUpdate(
                { _id: sub },
                { $push: { addresses: { street, city, state, zip, country } } }
            );
            res.status(200).json(
                new ApiResponse(200, 'Address added successfully')
            );
        } catch (error) {
            console.error(error);
            next(error);
        }
    }
}

export const addressController = new AddressController();
