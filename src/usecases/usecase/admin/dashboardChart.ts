import { IServerResponse } from "../../../infrastructure/types/IResponse"
import { IBookingRepository } from "../../interface/repository/IBookingRepository"
import { IUserRepository } from "../../interface/repository/IUserRepository";

export const dashboardChartData = async(bookingRepository:IBookingRepository, userRepository:IUserRepository):Promise<IServerResponse> => {
    try {
        const [servicePercentage, bookingCount, usersCount] = await Promise.all([
            bookingRepository.findAverageOfServiceBooking(),
            bookingRepository.findDateBasedBookingCount(),
            userRepository.findDateBasedUserLoginCount(),
        ]);
        return {
            statusCode:200,
            success:true,
            message:'Chart Data Fetching Successful',
            data:{usersCount, bookingCount, servicePercentage}
        }
    } catch (error) {
        throw error
    }
}