import { CustomClass } from "./customError";

export class ForbiddenError extends CustomClass {
    statusCode = 403;
    reason = 'You do not have permission to access this resource.';

    constructor() {
        super("ForbiddenError: You do not have permission to access this resource.");
        Object.setPrototypeOf(this, ForbiddenError.prototype);
    }

    serializeError() {
        return [{ message: this.reason }];
    }
}