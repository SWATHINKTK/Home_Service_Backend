import { Document } from "mongoose";
import { IBooking } from "../../../../domain/booking";
import { IBookingRepository } from "../../../../usecases/interface/repository/IBookingRepository";
import { bookingModel } from "../models/bookingModel"
import { createBooking } from "./booking/createBooking";
import { findAllBooking } from "./booking/findAllBookings";

export class BookingRepository implements IBookingRepository{
    
    private readonly _bookingModelInstance:typeof bookingModel
    constructor(_bookingModelInstance:typeof bookingModel){
        this._bookingModelInstance = _bookingModelInstance;
    }

    createBooking(bookingData: IBooking): Promise<IBooking> {
        return createBooking(bookingData, this._bookingModelInstance)
    }

    findAllBooking(query: { [key: string]: any; }): Promise<(IBooking & Document)[]> {
        return findAllBooking(query, this._bookingModelInstance);
    }
}