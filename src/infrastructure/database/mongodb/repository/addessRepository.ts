import { IAddress } from "../../../../domain/address";
import { IAddressRepository } from "../../../../usecases/interface/repository/IAddressRepositry";
import { addressModel } from "../models/addressModel";
import { createNewAddress } from "./address/createNewAddress";
import { findAllAddress } from "./address/findAllAddress";

export class AddressRepository implements IAddressRepository{
    private readonly _addressModelInstance:typeof addressModel;
    constructor(addressModelInstance:typeof addressModel){
        this._addressModelInstance = addressModelInstance;
    }

    createNewAddress(newAddress: IAddress): Promise<string> {
        return createNewAddress(newAddress, this._addressModelInstance)
    }

    findAllAddress(userId: string): Promise<IAddress[]> {
        return findAllAddress(userId, this._addressModelInstance)
    }
    
}