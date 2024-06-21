import { IServerResponse } from "../../../infrastructure/types/IResponse";
import { PaymentStatus, WorkStatus } from "../../../infrastructure/types/booking";
import { IBookingRepository } from "../../interface/repository/IBookingRepository";

export const viewSalesReport = async(bookingRepository:IBookingRepository):Promise<IServerResponse> => {
    try {
        const salesGenerator =  bookingRepository.findAllBooking(0,4,{workStatus:WorkStatus.COMPLETED, paymentStatus:PaymentStatus.COMPLETED},false);
        const sales = await salesGenerator.next();
        return {
            statusCode:200,
            success:true,
            message:'Sales Data Retrieved Successful.',
            data:sales.value
        }
    } catch (error) {
        throw error
    }
}