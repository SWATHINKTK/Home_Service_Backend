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
    CANCELLED = 'Cancelled'
}