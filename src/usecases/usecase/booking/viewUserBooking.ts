import { IBookingRepository } from "../../interface/repository/IBookingRepository";

export const viewUserBooking = async(userId:string, history:boolean, bookingRepository:IBookingRepository) => {
    try {
        let query = {};
        if(history){
            query = {
                userId,
                workStatus:{$nin:['Completed','Cancelled']}
            }
        }else{
            query = {
                userId,
                workStatus:{$in:['Completed','Cancelled']}
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