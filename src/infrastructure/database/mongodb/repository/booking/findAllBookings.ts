import { DBConnectionError } from "../../../../../usecases/handler/databaseConnectionError";
import { bookingModel } from "../../models/bookingModel";
import { IBookingsResponse, WorkStatus } from "../../../../types/booking";
import { Query } from "../../../../types/queryTypes";

export const findAllBooking = async function* (page:number, pageLength:number, query:Query, existWorkerId:boolean,bookingModelInstance: typeof bookingModel): AsyncGenerator<IBookingsResponse> {
    try {
        const pageSize = pageLength;
        const skip = (page - 1) * pageSize;
        const totalBookings = await bookingModelInstance.countDocuments(query);
        const totalPages = Math.ceil(totalBookings / pageSize);
        const bookings = await bookingModelInstance.find(query)
                                                       .populate({path:'serviceId', select:'_id serviceName image'})
                                                       .populate({path:'userId', select:'_id firstname lastname phonenumber email'})
                                                       .sort({ createdAt: -1 })
                                                       .skip(skip)
                                                       .limit(pageSize);
        yield {
            bookings,
            currentPage:page,
            totalPages,
            totalDocuments:totalBookings
        };
    } catch (error) {
        console.log(error)
        throw new DBConnectionError();
    }
}