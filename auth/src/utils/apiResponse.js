export class ApiResponse {
    constructor(statusCode = 200, message = 'OK', data = null) {
        this.success = statusCode < 400;
        this.statusCode = statusCode;
        this.message = message;
        this.data = data;
    }
}
