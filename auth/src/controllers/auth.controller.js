class AuthController {
    async registerUser(req, res) {
        try {
            res.send(req.body);
        } catch (error) {
            console.error(error);
        }
    }
}

export const authController = new AuthController();
