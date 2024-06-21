import { InternalServerError } from "../../../../../usecases/handler/internalServerError";
import { bookingModel } from "../../models/bookingModel";

export const fetchTotalSalesAndRevenue = async(bookingModelInstance:typeof bookingModel) => {
    try {
        const totalSalesAndRevenue = await bookingModelInstance.aggregate([
          {
            $group:{
                _id:null,
                totalSales:{$sum:'$totalAmount'},
                totalRevenue:{$sum:'$advancePaymentAmount'}
            }
          }
        ])
        return totalSalesAndRevenue[0];
    } catch (error) {
        throw new InternalServerError('Data Fetching Error');
    }
}