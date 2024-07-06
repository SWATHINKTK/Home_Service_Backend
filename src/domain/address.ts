export interface IAddress{
    buildingName:string;
    phoneNumber:string;
    location:{
        longitude:number;
        latitude:number;
    };
    locationDetails:string;
    userId?:string;
}