import { IServerResponse } from "../../../infrastructure/types/IResponse";
import { IBookingRepository } from "../../interface/repository/IBookingRepository";

export const viewAllBookings = async(bookingRepository:IBookingRepository):Promise<IServerResponse> => {
    try {
        const sales = await bookingRepository.findAllBooking({},false);
        return {
            statusCode:200,
            success:true,
            message:'Bookings Data Retrieved Successful.',
            data:sales
        }
    } catch (error) {
        throw error
    }
}