import { Document } from "mongoose";
import { IBooking } from "../../../domain/booking";
import { Query } from "../../../infrastructure/types/queryTypes";
import { IBookingsResponse } from "../../../infrastructure/types/booking";

export interface IBookingRepository{
    createBooking(bookingData:IBooking):Promise<IBooking>;
    findAllBooking(page:number, pageLength:number, query:Query, existWorkerId:boolean):AsyncGenerator<IBookingsResponse>;
    findBooking(query:Query):Promise<IBooking & Document>;
    updateBookingStatus(query:Query[]):Promise<IBooking & Document>;
    fetchTotalSalesAndRevenue():Promise<any>;
}