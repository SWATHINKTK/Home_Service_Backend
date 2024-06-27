import { Document } from "mongoose";
import { IBooking } from "../../../../domain/booking";
import { IBookingRepository } from "../../../../usecases/interface/repository/IBookingRepository";
import { bookingModel } from "../models/bookingModel"
import { createBooking } from "./booking/createBooking";
import { findAllBooking } from "./booking/findAllBookings";
import { findBooking } from "./booking/findBooking";
import { updateBookingStatus } from "./booking/updateBookingStatus";
import { Query } from "../../../types/queryTypes";
import { fetchTotalSalesAndRevenue } from "./booking/fetchTotalSalesAndRevenue";
import { IBookingsResponse } from "../../../types/booking";
import { findAverageOfServiceBooking } from "./booking/findAverageOfServiceBooking";
import { findDateBasedBookingCount } from "./booking/findDateBasedBookingCount";
import { findTopPerformingWorkers } from "./booking/findTopPerfomingWorkers";
import { findTopPerformingUsers } from "./booking/findTopPerformingUsers";

export class BookingRepository implements IBookingRepository{
    
    private readonly _bookingModelInstance:typeof bookingModel
    constructor(_bookingModelInstance:typeof bookingModel){
        this._bookingModelInstance = _bookingModelInstance;
    }
   
    createBooking(bookingData: IBooking): Promise<IBooking> {
        return createBooking(bookingData, this._bookingModelInstance)
    }

    async *findAllBooking(page:number, pageLength:number, query:Query, existWorkerId:boolean): AsyncGenerator<IBookingsResponse> {
        yield* findAllBooking(page, pageLength, query, existWorkerId, this._bookingModelInstance);
    }

    findBooking(query:Record<string,any>):Promise<IBooking & Document>{
        return findBooking(query, this._bookingModelInstance)
    }

    updateBookingStatus(query:Query[]):Promise<IBooking & Document> {
        return updateBookingStatus(query, this._bookingModelInstance)
    }

    fetchTotalSalesAndRevenue(): Promise<any> {
       return fetchTotalSalesAndRevenue(this._bookingModelInstance)
    }

    findAverageOfServiceBooking(): Promise<any> {
        return findAverageOfServiceBooking(this._bookingModelInstance);
    }

    findDateBasedBookingCount(): Promise<any> {
        return findDateBasedBookingCount(this._bookingModelInstance);
    }

    findTopPerformingWorkers(): Promise<any> {
        return findTopPerformingWorkers(this._bookingModelInstance)
    }

    findTopPerformingUsers(): Promise<any> {
        return findTopPerformingUsers(this._bookingModelInstance);
    }
    
}