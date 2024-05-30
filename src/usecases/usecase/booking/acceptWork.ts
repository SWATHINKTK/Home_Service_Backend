import { IServerResponse } from "../../../infrastructure/types/IResponse";
import { WorkStatus } from "../../../infrastructure/types/booking";
import { NotFoundError } from "../../handler/notFoundError";
import { IBookingRepository } from "../../interface/repository/IBookingRepository";

export const acceptWork = async (
    workerId: string,
    bookingId: string,
    bookingRepository: IBookingRepository
):Promise<IServerResponse> => {
    try {    
        const booking = await bookingRepository.findBooking({_id:bookingId});
        if(!booking){
            throw new NotFoundError('Booking Id Invalid')
        }
        const query = [
            {_id:bookingId},
            {workStatus:WorkStatus.ACCEPTED, workerId}
        ]
        const updatedBooking = await bookingRepository.updateBookingStatus(query);
        return {
            statusCode:200,
            success:true,
            data:updatedBooking,
            message:'Accept the Works'
        }
    } catch (error) {
        throw error;
    }
};
