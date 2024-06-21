import { PaymentStatus } from "../../../infrastructure/types/booking";
import { IBookingRepository } from "../../interface/repository/IBookingRepository";

export const viewUserBooking = async(userId:string, page:number, history:boolean, bookingRepository:IBookingRepository) => {
    try {
        let query = {};
        if(history){
            query = {
                userId,
                workStatus:{$in:['Completed','Cancelled']},
                paymentStatus:{$nin:['Pending']}
            }
        }else{
            query = {
                userId,
                workStatus:{$nin:['Cancelled']},
                paymentStatus:'Pending' 
            }
        }

        const bookingGenerator = bookingRepository.findAllBooking(page,6,query, false);
        const bookings = await bookingGenerator.next();
        return {
            statusCode:200,
            success:true,
            message:'All Booking Data Retrieved Successful',
            data:bookings.value
        }
    } catch (error) {
        throw error;
    }
}