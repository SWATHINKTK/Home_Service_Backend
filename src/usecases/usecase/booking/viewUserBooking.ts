import { PaymentStatus } from "../../../infrastructure/types/booking";
import { IBookingRepository } from "../../interface/repository/IBookingRepository";

export const viewUserBooking = async(userId:string, history:boolean, bookingRepository:IBookingRepository) => {
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

        console.log("query",query)

        const bookings = await bookingRepository.findAllBooking(query, false);
        return {
            statusCode:200,
            success:true,
            message:'All Booking Data Retrieved Successful',
            data:bookings
        }
    } catch (error) {
        throw error;
    }
}