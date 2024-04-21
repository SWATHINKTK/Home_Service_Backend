import { IOTPService } from "../../usecaseLayer/interface/services/IOTPService";

interface OTPData{
    otp:string;
    timestamp:number
}

export class OTPService implements IOTPService{

    private userOTPMap:Map< string, OTPData>
    constructor(){
        this.userOTPMap = new Map();
    }

    generateOTP(): string {
        const digits = "0123456789";
        let otp = '';
        for(let i = 0; i < 6 ; i++){
            otp += digits[Math.floor(Math.random() * 10)];
        }
        return otp;
    }

    generateAndStoreOTP( email:string ):string {
        const otp = this.generateOTP();
        const otpData:OTPData = {
            otp,
            timestamp:Date.now()
        }
        this.userOTPMap.set( email, otpData );
        return otp;
    }

    verifyOTP(userEnteredOTP: string, email: string):{success:boolean,message:string} {
        const otpData = this.userOTPMap.get(email);
        console.log(otpData, userEnteredOTP, email);

        if(!otpData){
            return {
                success:false,
                message:'OTP verification failed.'
            };
        }

        if(otpData?.otp != userEnteredOTP){
            return {
                success:false,
                message:'OTP verification failed. OTP does not match.'
            };
        }

        const currentTime = Date.now();
        if( currentTime - otpData?.timestamp > 120 * 1000 ){
            return {
                success:false, 
                message:'OTP verification failed: OTP expired'
            };
        }

        return {
            success:true,
            message:'OTP verification successful'
        }
    }

}