import { IServerResponse } from "../../../infrastructure/types/IResponse";
import { BadRequestError } from "../../handler/badRequestError";
import { IBookingRepository } from "../../interface/repository/IBookingRepository";

export const findAllBookings = async(userId:string | undefined, workerId:string | undefined, history:boolean, bookingRepository:IBookingRepository):Promise<IServerResponse> => {
    try {
        let query = {};
        if(userId){
            query = {
                userId,
            }
        }else if(workerId){
            query = {workerId}
        }

        const bookings = await bookingRepository.findAllBooking(query);
        console.log(bookings)
        return {
            statusCode:200,
            success:true,
            message:'All Booking Data Retrieved Successful',
            data:bookings
        }

    } catch (error) {
        console.log('error',error)
        throw new BadRequestError('server error occurred');
    }
}