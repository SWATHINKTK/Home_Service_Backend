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