import { CustomClass } from "./customError";

export class UnauthorizedRequestError  extends CustomClass {
    statusCode = 401;

    constructor(public message:string) {
        super(message);
        Object.setPrototypeOf(this, UnauthorizedRequestError.prototype);
    }

    serializeError() {
        return [{ message: this.message }];
    }
}
