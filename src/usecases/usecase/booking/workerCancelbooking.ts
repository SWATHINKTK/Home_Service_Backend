import { IServerResponse } from "../../../infrastructure/types/IResponse";
import { WorkStatus } from "../../../infrastructure/types/booking";
import { IBookingRepository } from "../../interface/repository/IBookingRepository";

export const workerCancelBooking = async(workerId:string , bookingId:string, reason:string, bookingRepository:IBookingRepository):Promise<IServerResponse> => {
    try {
        const query = [
            {_id:bookingId, workerId},
            {workStatus:WorkStatus.CANCELLED,paymentStatus:'Cancelled' , cancelReason:reason},
        ]
        const updatedBooking = bookingRepository.updateBookingStatus(query);
        return {
            statusCode:200,
            success:true,
            data:updatedBooking,
            message:'Booking Cancelation Successful'
        }
    } catch (error) {
        throw error
    }
}