import mongoose, { Document } from "mongoose";
import { IBooking } from "../../../../../domain/booking";
import { DBConnectionError } from "../../../../../usecases/handler/databaseConnectionError";
import { bookingModel } from "../../models/bookingModel";

export const findAllBooking = async (query: { [key: string]: any; }, bookingModelInstance: typeof bookingModel): Promise<(IBooking & Document)[]> => {
    try {
        let pipeLine = [];
        if (query.userId) {
            pipeLine[0] = {
                $match: {
                    userId: mongoose.Types.ObjectId.createFromHexString(query.userId),
                    workStatus: { $nin: ['Completed', 'Cancelled'] }
                }
            }
        }else if(query.workerId){
            pipeLine[0] = {
                $match: {
                    userId: mongoose.Types.ObjectId.createFromHexString(query.workerId),
                    workStatus: { $nin: ['Completed', 'Cancelled'] }
                }
            }
        }

        const allBookings = await bookingModelInstance.aggregate([
            ...pipeLine,
            {
                $lookup: {
                    from: 'services',
                    localField: 'serviceId',
                    foreignField: '_id',
                    as: 'serviceInfo'
                }
            },
            {
                $unwind: '$serviceInfo'
            }
        ]);
        return allBookings;
    } catch (error) {
        throw new DBConnectionError();
    }
}