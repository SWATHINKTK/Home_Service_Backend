import { CustomClass } from "./customError";

export class InternalServerError extends CustomClass {
    statusCode = 500;

    constructor(public message:string){
        super(message);

        Object.setPrototypeOf(this, InternalServerError.prototype)
    }

    serializeError() {
        return [{message:this.message}]
    }
}