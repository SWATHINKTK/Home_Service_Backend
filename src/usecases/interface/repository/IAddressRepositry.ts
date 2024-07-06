import { IAddress } from "../../../domain/address";

export interface IAddressRepository{
    createNewAddress(newAddress:IAddress):Promise<string>;
    findAllAddress(userId:string):Promise<IAddress[]>;
}