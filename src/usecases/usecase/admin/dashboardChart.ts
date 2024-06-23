import { IServerResponse } from "../../../infrastructure/types/IResponse"
import { IBookingRepository } from "../../interface/repository/IBookingRepository"

export const dashboardChartData = async(bookingRepository:IBookingRepository):Promise<IServerResponse> => {
    try {
        const servicePercentage = await bookingRepository.findAverageOfServiceBooking();
        const bookingCount = await bookingRepository.findDateBasedBookingCount();
        return {
            statusCode:200,
            success:true,
            message:'Chart Data Fetching Successful',
            data:bookingCount
        }
    } catch (error) {
        throw error
    }
}