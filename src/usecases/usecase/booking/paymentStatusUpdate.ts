import { PaymentStatus } from "../../../infrastructure/types/booking";
import { IBookingRepository } from "../../interface/repository/IBookingRepository";
import { IWorkerRepository } from "../../interface/repository/IWorkerRepository";

export const paymentStatusUpdate = async(bookingId:string, transactionId:string, workerId:string, totalAmount:number, bookingRepository:IBookingRepository, workerRepository:IWorkerRepository) => {
    try {
        const query = [
            { _id:bookingId },
            { paymentStatus:PaymentStatus.COMPLETED, transactionId}
        ] 
        const updatedBooking = await bookingRepository.updateBookingStatus(query);
        await workerRepository.walletUpdate(workerId,totalAmount)
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