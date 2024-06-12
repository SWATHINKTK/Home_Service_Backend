import { IServerResponse } from "../../../infrastructure/types/IResponse";
import { PaymentStatus, WorkStatus } from "../../../infrastructure/types/booking";
import { IBookingRepository } from "../../interface/repository/IBookingRepository";

export const viewSalesReport = async(bookingRepository:IBookingRepository):Promise<IServerResponse> => {
    try {
        const sales = await bookingRepository.findAllBooking({workStatus:WorkStatus.COMPLETED, paymentStatus:PaymentStatus.COMPLETED},false);
        return {
            statusCode:200,
            success:true,
            message:'Sales Data Retrieved Successful.',
            data:sales
        }
    } catch (error) {
        throw error
    }
}