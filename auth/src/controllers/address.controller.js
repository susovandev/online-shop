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
}

export const addressController = new AddressController();
