import mongoose, { Document } from "mongoose";
import { IBooking } from "../../../../../domain/booking";
import { DBConnectionError } from "../../../../../usecases/handler/databaseConnectionError";
import { bookingModel } from "../../models/bookingModel";
import { WorkStatus } from "../../../../types/booking";

export const findAllBooking = async (query: { [key: string]: any; }, bookingModelInstance: typeof bookingModel): Promise<(IBooking & Document)[]> => {
    try {
        console.log(query)
        console.log('-------------------------------------')
        const allBookings = await bookingModelInstance.find(query)
                                                       .populate({path:'serviceId', select:'_id serviceName image'})
                                                       .populate({path:'userId', select:'_id firstname lastname phonenumber email'});
        console.log(allBookings)
        return allBookings;
    } catch (error) {
        console.log(error)
        throw new DBConnectionError();
    }
}