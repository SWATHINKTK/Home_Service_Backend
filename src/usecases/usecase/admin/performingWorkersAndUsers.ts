import { IServerResponse } from "../../../infrastructure/types/IResponse";
import { IBookingRepository } from "../../interface/repository/IBookingRepository";

export const performingWorkersAndUsers = async(bookingRepository:IBookingRepository):Promise<IServerResponse> => {
    try {
        const [topWorkers, topUsers] = await Promise.all([
            bookingRepository.findTopPerformingWorkers(),
            bookingRepository.findTopPerformingUsers()
        ])
        return{
            statusCode:200,
            success:true,
            message:'Top Performers Data Fetching Successful.',
            data:{topWorkers, topUsers}
        }
    } catch (error) {
        throw error;
    }
}