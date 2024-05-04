export interface IOTPService{
    generateOTP():string;
    generateAndStoreOTP( email:string ):string;
    verifyOTP( otp:string, email:string ):{success:boolean,message:string};
}