import { Document } from "mongoose";
import { IBooking } from "../../../../../domain/booking";
import { BadRequestError } from "../../../../../usecases/handler/badRequestError";
import { bookingModel } from "../../models/bookingModel";
import { Query } from "../../../../types/queryTypes";
import { IUser } from "../../../../../domain/user";


export const updateBookingStatus = async(query:Query[], bookingModelInstance:typeof bookingModel ):Promise<IBooking & Document> => {
    try {
        const booking:any = await bookingModelInstance.findByIdAndUpdate(...query,{new:true})
                                                    .populate({path:'userId', select:'_id firstname lastname phonenumber email'});
        if(!booking){
            throw new BadRequestError('Booking Document Not Found.')
        }
        return booking;
    } catch (error) {
        if (error instanceof BadRequestError) {
            throw error;
        }
        throw new BadRequestError('An error occurred while finding the booking.');
    }
}