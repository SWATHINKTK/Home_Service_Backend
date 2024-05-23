import { Document } from "mongoose";
import { IBooking } from "../../../../../domain/booking";
import { DBConnectionError } from "../../../../../usecases/handler/databaseConnectionError";
import { bookingModel } from "../../models/bookingModel";

export const findAllBooking = async(query:{[key: string]: any;}, bookingModelInstance:typeof bookingModel):Promise<(IBooking & Document)[]> => {
    try {
        const allBookings = await bookingModelInstance.find(query);
        return allBookings;
    } catch (error) {
        throw new DBConnectionError();
    }
}