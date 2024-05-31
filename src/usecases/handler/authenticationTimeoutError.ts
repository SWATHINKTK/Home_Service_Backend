import { CustomClass } from "./customError";

export  class AuthenticationTimeoutError extends CustomClass{
    statusCode = 409;
    constructor(){
        super('OTP has expired. Please request a new OTP.');
        
        Object.setPrototypeOf(this, AuthenticationTimeoutError.prototype)
    }
    serializeError(): { message: string; fields?: string | undefined; }[] {
        return [{message:'OTP has expired. Please request a new OTP.'}];
    }

}