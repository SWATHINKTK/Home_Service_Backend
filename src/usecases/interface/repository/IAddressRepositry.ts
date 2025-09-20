import { findAddressById } from './../../../infrastructure/database/mongodb/repository/address/findAddressById';
import { IAddress } from "../../../domain/address";

export interface IAddressRepository{
    createNewAddress(newAddress:IAddress):Promise<IAddress>;
    findAllAddress(userId:string):Promise<IAddress[]>;
    findAddressById(addressId:string):Promise<IAddress | null>;
}