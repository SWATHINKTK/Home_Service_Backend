import { Document } from "mongoose";
import { IBooking } from "../../../../../domain/booking";
import { BadRequestError } from "../../../../../usecases/handler/badRequestError";
import { bookingModel } from "../../models/bookingModel";

export const findBooking = async (query:{ [key: string]: any;}, bookingModelInstance:typeof bookingModel):Promise<IBooking & Document> => {
    try {
        const booking = await bookingModelInstance.findOne(query);
        if(!booking){
            throw new BadRequestError('Booking Id Not Valid.')
        }
        return booking
    } catch (error) {
        if (error instanceof BadRequestError) {
            throw error;
        }
        throw new BadRequestError('An error occurred while finding the booking.');
    }
}