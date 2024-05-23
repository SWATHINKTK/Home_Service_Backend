import { Document } from "mongoose";
import { IBooking } from "../../../domain/booking";

export interface IBookingRepository{
    createBooking(bookingData:IBooking):Promise<IBooking>;
    findAllBooking(query:{[key:string]:any}):Promise<(IBooking & Document)[]>;
}