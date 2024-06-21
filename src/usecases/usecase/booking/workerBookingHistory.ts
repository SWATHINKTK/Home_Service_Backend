import { IBookingRepository } from "../../interface/repository/IBookingRepository";

export const viewWorkerBookingHistory = async(workerId:string, bookingRepository:IBookingRepository) => {
    try {
        const query = {
            workerId,
            workStatus:{$in:['Completed','Cancelled']},
            paymentStatus:{$nin:['Pending']}
        }

        const bookings = await bookingRepository.findAllBooking(query, false);
        return {
            statusCode:200,
            success:true,
            message:'Booking History Data Retrieved Successful',
            data:bookings
        }
    } catch (error) {
        throw error;
    }
}