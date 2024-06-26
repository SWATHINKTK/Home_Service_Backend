import { IServerResponse } from "../../../infrastructure/types/IResponse";
import { IBookingRepository } from "../../interface/repository/IBookingRepository";
import { IWorkerRepository } from "../../interface/repository/IWorkerRepository";

export const dashboardRecent = async(bookingRepository:IBookingRepository, workerRepository:IWorkerRepository):Promise<IServerResponse> => {
    try {
        const bookingGenerator = bookingRepository.findAllBooking(1,4,{},false);
        const bookings = await bookingGenerator.next();
        const workers = await workerRepository.findAllWorker(1,4,{});
        return {
            statusCode:200,
            success:true,
            message:'Dashboard Recent Data Retrieved Successfully.',
            data:{
                bookingsRecent:bookings.value,
                workersRecent:workers
            }
        }
    } catch (error) {
        throw error;
    }
}