export interface IService {
    _id?: string;
    serviceName: string;
    minimumAmount: number;
    hourlyAmount: number;
    serviceDescription: string;
    icon?:string;
    image?:string;
    _isBlocked?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}