import { PaymentStatus } from "../../../infrastructure/types/booking";
import { IBookingRepository } from "../../interface/repository/IBookingRepository";

export const paymentStatusUpdate = (bookingId:string, bookingRepository:IBookingRepository) => {
    try {
        const query = [
            { _id:bookingId },
            { paymentStatus:PaymentStatus.COMPLETED}
        ] 
        const updatedBooking = bookingRepository.updateBookingStatus(query);
        return {
            statusCode:200,
            success:true,
            data:updatedBooking,
            message:'Booking is Cancelled.'
        }
    } catch (error) {
        throw error;
    }
}