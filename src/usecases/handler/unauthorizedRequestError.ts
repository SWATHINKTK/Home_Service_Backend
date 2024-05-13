import { CustomClass } from "./customError";

export class UnauthorizedRequestError  extends CustomClass {
    statusCode = 401;
    reason = 'Unauthorized access.';

    constructor() {
        super("UnauthorizedError: Unauthorized access.");
        Object.setPrototypeOf(this, UnauthorizedRequestError.prototype);
    }

    serializeError() {
        return [{ message: this.reason }];
    }
}
