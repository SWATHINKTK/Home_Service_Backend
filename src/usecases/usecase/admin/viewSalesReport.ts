import { IServerResponse } from "../../../infrastructure/types/IResponse";
import { PaymentStatus, WorkStatus } from "../../../infrastructure/types/booking";
import { IBookingRepository } from "../../interface/repository/IBookingRepository";

export const viewSalesReport = async(startDate:string, endDate:string, page:number, pageSize:number, bookingRepository:IBookingRepository):Promise<IServerResponse> => {
    try {
        console.log(startDate,endDate)
        const query :Record<string,any>= {workStatus:WorkStatus.COMPLETED, paymentStatus:PaymentStatus.COMPLETED};
        if (startDate && endDate) {
            query.createdAt = { $gte: new Date(startDate), $lte: new Date(endDate) };
        }
        const salesGenerator =  bookingRepository.findAllBooking(page,pageSize,query,false);
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