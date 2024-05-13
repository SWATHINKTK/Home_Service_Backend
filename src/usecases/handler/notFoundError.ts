import { CustomClass } from "./customError";

export class NotFoundError   extends CustomClass {
    statusCode = 404;

    constructor(public message:string) {
        super(message);

        Object.setPrototypeOf(this, NotFoundError.prototype);
    }

    serializeError() {
        return [{ message: this.message }];
    }
}
