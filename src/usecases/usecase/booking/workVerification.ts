import { IServerResponse } from "../../../infrastructure/types/IResponse";
import { WorkStatus } from "../../../infrastructure/types/booking";
import { AuthenticationTimeoutError } from "../../handler/authenticationTimeoutError";
import { BadRequestError } from "../../handler/badRequestError";
import { UnauthorizedRequestError } from "../../handler/unauthorizedRequestError";
import { IBookingRepository } from "../../interface/repository/IBookingRepository";


export const workVerification = async(workerId:string, bookingId:string, otp:string, bookingRepository:IBookingRepository):Promise<IServerResponse> => {
    try {
        if(!workerId || !bookingId || !otp){
            throw new BadRequestError('Request Data Invalid.');
        }
        const booking = await bookingRepository.findBooking({_id:bookingId, workerId});
        const otpTime = new Date(booking.otpTime as Date);
        const currentTime = new Date();
        if(otpTime.getDate() < currentTime.getDate()){
            throw new AuthenticationTimeoutError();
        }

        const timeDifference = (currentTime.getTime() - otpTime.getTime())/(1000 * 60);
        if(timeDifference > 30){
            throw new AuthenticationTimeoutError();
        }

        if(otp != booking.otp){
            throw new UnauthorizedRequestError('OTP Does Not Match.')
        }
        
        const query = [
            {_id:bookingId, workerId},
            {workStatus:WorkStatus.STARTED}
        ]
        const updateBooking = await bookingRepository.updateBookingStatus(query);
        return {
            statusCode:200,
            success:true,
            message:'Work Started.',
            data:updateBooking
        }
    } catch (error) {
        throw error;
    }
}