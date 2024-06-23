import { format } from "morgan";
import { InternalServerError } from "../../../../../usecases/handler/internalServerError";
import { bookingModel } from "../../models/bookingModel";

export const findDateBasedBookingCount = async(bookingModelInstance:typeof bookingModel) => {
    try {
        const bookingCount = await bookingModel.aggregate([
            {
                $match: {
                  createdAt: {
                    $gte: new Date(new Date().setDate(new Date().getDate() - 7))
                  }
                }
            },
            {
                $group:{
                    _id:{$dateToString:{format:"%Y-%m-%d", date:'$createdAt'}},
                    // _id:'$createdAt',
                    count:{$sum:1}
                }
            },
            {
                $sort:{_id:1}
            }
        ]) 
        return bookingCount;
    } catch (error) {
        console.log(error);
        throw new InternalServerError('Data Fetching Failed.');
    }
}