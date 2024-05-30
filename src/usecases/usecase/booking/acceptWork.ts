import { IServerResponse } from "../../../infrastructure/types/IResponse";
import { WorkStatus } from "../../../infrastructure/types/booking";
import { BadRequestError } from "../../handler/badRequestError";
import { IBookingRepository } from "../../interface/repository/IBookingRepository";

export const acceptWork = async (
    workerId: string,
    status: string,
    bookingId: string,
    bookingRepository: IBookingRepository
):Promise<IServerResponse> => {
    try {
        const incomingStatus = new RegExp(`^${status}$`, 'i')
        if(!incomingStatus.test(WorkStatus.ACCEPTED)){
            throw new BadRequestError('Invalid Status')
        }
        const query = [
            {_id:bookingId},
            {workStatus:status, workerId}
        ]
        const updatedBooking = bookingRepository.updateBookingStatus(query);
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
