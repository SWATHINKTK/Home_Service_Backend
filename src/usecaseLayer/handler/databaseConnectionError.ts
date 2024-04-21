import { CustomClass } from "./customError";

export class DBConnectionError extends CustomClass{

    statusCode = 500;
    reason = 'DataBase Connection Establishment Error.';

    constructor(){
        super("Database Connection Error");

        Object.setPrototypeOf(this, DBConnectionError.prototype)
    }

    serializeError(){
        return [ { message:this.reason } ]
    }
}