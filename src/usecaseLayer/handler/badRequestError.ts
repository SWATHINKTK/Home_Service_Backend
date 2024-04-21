import { CustomClass } from "./customError";

export class BadRequestError extends CustomClass {
    statusCode = 400;

    constructor(public message:string){
        super(message);

        Object.setPrototypeOf(this, BadRequestError.prototype)
    }

    serializeError() {
        return [{message:this.message}]
    }
}