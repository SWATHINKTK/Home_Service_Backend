export interface IAddress{
    _id?:string;
    buildingName:string;
    phoneNumber:string;
    location:{
        longitude:number;
        latitude:number;
    };
    locationDetails:string;
    userId?:string;
    __v?:number;
}