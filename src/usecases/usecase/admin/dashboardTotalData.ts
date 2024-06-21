import { IServerResponse } from "../../../infrastructure/types/IResponse";
import { IBookingRepository } from "../../interface/repository/IBookingRepository";
import { IUserRepository } from "../../interface/repository/IUserRepository";
import { IWorkerRepository } from "../../interface/repository/IWorkerRepository";

export const totalDashboardData = async (
    bookingRepository: IBookingRepository,
    userRepository: IUserRepository,
    workerRepository: IWorkerRepository
):Promise<IServerResponse> => {
    try {
        const [totalSalesAndRevenue, totalUsers, totalWorkers] = await Promise.all([
            bookingRepository.fetchTotalSalesAndRevenue(),
            userRepository.retrieveTotalUsersCount(),
            workerRepository.retrieveTotalWorkersCount()
        ]);
    
        const resultData = {
            ...totalSalesAndRevenue,
            totalUsers,
            totalWorkers
        };
        return {
            statusCode:200,
            success:true,
            message:'Dashboard Total Data Retrieved',
            data:resultData
        }
    } catch (error) {
        throw error;
    }
};
