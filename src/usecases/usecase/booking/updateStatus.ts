import { IServerResponse } from "../../../infrastructure/types/IResponse";
import { WorkStatus } from "../../../infrastructure/types/booking";
import { BadRequestError } from "../../handler/badRequestError";
import { IBookingRepository } from "../../interface/repository/IBookingRepository";

export const updateBookingStatus = async(userId:string ,status:string, bookingId:string, bookingRepository:IBookingRepository):Promise<IServerResponse> => {
    try {
        let validStatus = '';
        const incomingStatus = new RegExp(`^${status}$`, 'i')
        if(incomingStatus.test(WorkStatus.CANCELLED)){
            validStatus = WorkStatus.CANCELLED;
        }else{
            throw new BadRequestError('Invalid Status')
        }
        const updatedBooking = bookingRepository.updateBookingStatus(validStatus, bookingId);
        return {
            statusCode:200,
            success:true,
            data:updatedBooking,
            message:'Booking Status is Updated'
        }
    } catch (error) {
        throw error
    }
}