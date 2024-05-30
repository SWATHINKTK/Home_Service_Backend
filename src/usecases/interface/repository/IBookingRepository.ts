import { Document } from "mongoose";
import { IBooking } from "../../../domain/booking";
import { Query } from "../../../infrastructure/types/queryTypes";

export interface IBookingRepository{
    createBooking(bookingData:IBooking):Promise<IBooking>;
    findAllBooking(query:{[key:string]:any}):Promise<(IBooking & Document)[]>;
    findBooking(query:{ [key: string]: any;}):Promise<IBooking & Document>;
    updateBookingStatus(query:Query[]):Promise<IBooking & Document>;
}