import mongoose, { Document } from "mongoose";
import { IBooking } from "../../../../../domain/booking";
import { DBConnectionError } from "../../../../../usecases/handler/databaseConnectionError";
import { bookingModel } from "../../models/bookingModel";
import { WorkStatus } from "../../../../types/booking";
import { Query } from "../../../../types/queryTypes";

export const findAllBooking = async (query:Query, existWorkerId:boolean,bookingModelInstance: typeof bookingModel): Promise<(IBooking & Document)[]> => {
    try {
        const allBookings = await bookingModelInstance.find(query)
                                                       .populate({path:'serviceId', select:'_id serviceName image'})
                                                       .populate({path:'userId', select:'_id firstname lastname phonenumber email'});
        return allBookings;
    } catch (error) {
        console.log(error)
        throw new DBConnectionError();
    }
}