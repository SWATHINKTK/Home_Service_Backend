import { IServerResponse } from "../../../infrastructure/types/IResponse";
import { AdditionalCharges, WorkStatus } from "../../../infrastructure/types/booking";
import { NotFoundError } from "../../handler/notFoundError";
import { IBookingRepository } from "../../interface/repository/IBookingRepository";

export const completeWork = async (
    workerId: string,
    bookingId: string,
    additionalCharges: AdditionalCharges,
    bookingRepository: IBookingRepository
): Promise<IServerResponse> => {
    try {
        const booking = await bookingRepository.findBooking({ _id: bookingId, workerId });
        if (!booking) {
            throw new NotFoundError('Booking id Invalid.')
        }
        const totalAmount = additionalCharges.reduce((acc, curr) => acc + (curr.amount * curr.qty), booking.serviceMinimumAmount)
        const query = [
            { _id:bookingId, workerId },
            { workStatus: WorkStatus.COMPLETED, totalAmount, additionalCharges }
        ]
        const completeBooking = await bookingRepository.updateBookingStatus(query);
        return {
            statusCode:200,
            success:true,
            message:'Work Completed',
            data:completeBooking
        }
    } catch (error) {
        throw error;
    }
};
