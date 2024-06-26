import { IBookingRepository } from "../../interface/repository/IBookingRepository";

export const viewWorkerBookingHistory = async(workerId:string, bookingRepository:IBookingRepository) => {
    try {
        const query = {
            workerId,
            workStatus:{$in:['Completed','Cancelled']},
            paymentStatus:{$nin:['Pending']}
        }

        const bookingGenerator = bookingRepository.findAllBooking(1,4,query, false);
        const bookings = await bookingGenerator.next();
        return {
            statusCode:200,
            success:true,
            message:'Booking History Data Retrieved Successful',
            data:bookings.value
        }
    } catch (error) {
        throw error;
    }
}