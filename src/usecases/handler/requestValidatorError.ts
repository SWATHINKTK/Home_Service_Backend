import { ValidationError } from "express-validator";
import { CustomClass } from "./customError";

export class RequestValidationError extends CustomClass{

    statusCode = 400;

    constructor(public errors:ValidationError[]){
        super("Invalid Entry");
        Object.setPrototypeOf(this,RequestValidationError.prototype);
    }

    serializeError(){
        return this.errors.map((err) => {
            if (err.type === 'field') {
              return { message: err.msg, field: err.path };
            }
            return { message: err.msg };
          });
    }
}