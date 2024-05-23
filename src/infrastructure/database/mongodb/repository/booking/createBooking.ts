import { IBooking } from "../../../../../domain/booking";
import { BadRequestError } from "../../../../../usecases/handler/badRequestError";
import { bookingModel } from "../../models/bookingModel";

export const createBooking = async(bookingData:IBooking, bookingModelInstance:typeof bookingModel): Promise<IBooking> => {
    try {
        const booking = await bookingModelInstance.create(bookingData);
        return booking;
    } catch (error:unknown) {
        console.log('booking', error)
        if(error instanceof Error)
            throw new BadRequestError(error.message);
        throw error
    }
}