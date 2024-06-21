import { Document } from "mongoose";
import { IBooking } from "../../domain/booking";

export interface IBookingRequestData {
    buildingName: string;
    date: string;
    startTime: string;
    endTime: string;
    description: string;
    serviceId: string;
    location:{
        longitude:number,
        latitude:number
    };
}


export enum PaymentStatus {
    PENDING = 'Pending',
    COMPLETED = 'Completed'
}


export enum WorkStatus {
    PENDING = 'Pending',
    ACCEPTED = 'Accepted',
    IN_PROGRESS = 'InProgress',
    COMPLETED = 'Completed',
    CANCELLED = 'Cancelled',
    STARTED = 'Started'
}


export type AdditionalCharges = {
        description: string;
        qty: number;
        amount: number;
    }[];

export interface IBookingsResponse{
    bookings:(IBooking & Document)[],
    currentPage:number,
    totalPages:number,
    totalDocuments:number
}