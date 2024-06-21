import { IServerResponse } from "../../../infrastructure/types/IResponse";
import { IBookingRepository } from "../../interface/repository/IBookingRepository";

export const viewAllBookings = async(page:number, bookingRepository:IBookingRepository):Promise<IServerResponse> => {
    try {
        const bookingGenerator = bookingRepository.findAllBooking(page,4,{},false);
        const bookings = await bookingGenerator.next();
        return {
            statusCode:200,
            success:true,
            message:'Bookings Data Retrieved Successful.',
            data:bookings.value
        }
    } catch (error) {
        throw error
    }
}