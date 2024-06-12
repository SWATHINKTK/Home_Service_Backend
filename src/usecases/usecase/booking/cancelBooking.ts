import { IServerResponse } from "../../../infrastructure/types/IResponse";
import { WorkStatus } from "../../../infrastructure/types/booking";
import { BadRequestError } from "../../handler/badRequestError";
import { IBookingRepository } from "../../interface/repository/IBookingRepository";

export const cancelBooking = async(userId:string ,status:string, bookingId:string, bookingRepository:IBookingRepository):Promise<IServerResponse> => {
    try {
        const incomingStatus = new RegExp(`^${status}$`, 'i')
        if(!incomingStatus.test(WorkStatus.CANCELLED)){
            throw new BadRequestError('Invalid Status')
        }
        const query = [
            {_id:bookingId, userId},
            {workStatus:status,paymentStatus:'Cancelled'},
        ]
        const updatedBooking = bookingRepository.updateBookingStatus(query);
        return {
            statusCode:200,
            success:true,
            data:updatedBooking,
            message:'Booking is Cancelled.'
        }
    } catch (error) {
        throw error
    }
}