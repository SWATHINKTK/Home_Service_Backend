import { Document } from "mongoose";
import { IBooking } from "../../../../../domain/booking";
import { BadRequestError } from "../../../../../usecases/handler/badRequestError";
import { bookingModel } from "../../models/bookingModel";

export const updateBookingStatus = async(status:string, bookingId:string, bookingModelInstance:typeof bookingModel ):Promise<IBooking & Document> => {
    try {
        const booking = await bookingModelInstance.findByIdAndUpdate({_id:bookingId},{bookingStatus:status},{new:true});
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