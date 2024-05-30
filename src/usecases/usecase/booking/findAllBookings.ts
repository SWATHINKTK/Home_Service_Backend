import { IServerResponse } from "../../../infrastructure/types/IResponse";
import { WorkStatus } from "../../../infrastructure/types/booking";
import { BadRequestError } from "../../handler/badRequestError";
import { IBookingRepository } from "../../interface/repository/IBookingRepository";

export const findAllBookings = async(userId:string | undefined, workerId:string | undefined, history:boolean, bookingRepository:IBookingRepository):Promise<IServerResponse> => {
    try {
        let query = {};
        if(userId){
            query = {
                userId:userId,
                workStatus:{$nin:['Completed','Cancelled']}
            }
        }else if(workerId){
            query = {workerId}
        }else{
            query = {
                workStatus:'Pending'
            }
        }

        const bookings = await bookingRepository.findAllBooking(query);
        return {
            statusCode:200,
            success:true,
            message:'All Booking Data Retrieved Successful',
            data:bookings
        }

    } catch (error) {
        console.log('error',error)
        throw new BadRequestError('server error occurred');
    }
}