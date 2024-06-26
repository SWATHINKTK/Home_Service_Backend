import { format } from "morgan";
import { InternalServerError } from "../../../../../usecases/handler/internalServerError";
import { bookingModel } from "../../models/bookingModel";

export const findDateBasedBookingCount = async(bookingModelInstance:typeof bookingModel) => {
    try {
        const bookingCount = await bookingModel.aggregate([
            {
                $match: {
                  createdAt: {
                    $gte: new Date(new Date().setMonth(new Date().getMonth() - 5))
                  }
                }
            },
            {
                $group: {
                    _id: { 
                        year: { $year: "$createdAt" }, 
                        month: { $month: "$createdAt" } 
                    },
                    count: { $sum: 1 }
                }
            },
            {
                $sort: { "_id.year": 1, "_id.month": 1 }
            }
        ]);
        console.log(bookingCount)
        return bookingCount;
    } catch (error) {
        console.log(error);
        throw new InternalServerError('Data Fetching Failed.');
    }
}