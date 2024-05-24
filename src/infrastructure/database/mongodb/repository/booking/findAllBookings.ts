import mongoose, { Document } from "mongoose";
import { IBooking } from "../../../../../domain/booking";
import { DBConnectionError } from "../../../../../usecases/handler/databaseConnectionError";
import { bookingModel } from "../../models/bookingModel";

export const findAllBooking = async(query:{[key: string]: any;}, bookingModelInstance:typeof bookingModel):Promise<(IBooking & Document)[]> => {
    try {
        let pipeLine = [
            {
                $match:{ userId: mongoose.Types.ObjectId.createFromHexString(query.userId)}
            },
        ]
        const userId = mongoose.Types.ObjectId.createFromHexString(query.userId);
        const allBookings = await bookingModelInstance.aggregate([
            ...pipeLine,
            {
                $lookup:{
                    from:'services',
                    localField:'serviceId',
                    foreignField:'_id',
                    as:'serviceInfo'
                }
            },
            {
                $unwind:'$serviceInfo'
            }
        ]);
        console.log(allBookings)
        return allBookings;
    } catch (error) {
        throw new DBConnectionError();
    }
}