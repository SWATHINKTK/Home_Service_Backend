import { IServerResponse } from "../../../infrastructure/types/IResponse";
import { WorkStatus } from "../../../infrastructure/types/booking";
import { NotFoundError } from "../../handler/notFoundError";
import { IBookingRepository } from "../../interface/repository/IBookingRepository";
import { IWorkerRepository } from "../../interface/repository/IWorkerRepository";

export const viewWorkerSpecificBooking = async (
    workerId: string,
    workerRepository: IWorkerRepository,
    bookingRepository: IBookingRepository
):Promise<IServerResponse> => { 
    try {
        const worker = await workerRepository.findWorker({_id:workerId});
        if(!worker){
            throw new NotFoundError('Worker is Not Found.')
        }

        const query = {
            workStatus:WorkStatus.PENDING,
            serviceId:worker.service
        }
        const bookings = await bookingRepository.findAllBooking(query,false);
        return {
            statusCode:200,
            success:true,
            message:'Booking Data Retrieved Successful.',
            data:bookings
        }
    } catch (error) {
        throw error
    }
};
