import { IBooking } from "../../../domain/booking";

export interface IBookingRepository{
    createBooking(bookingData:IBooking):Promise<IBooking>;
}