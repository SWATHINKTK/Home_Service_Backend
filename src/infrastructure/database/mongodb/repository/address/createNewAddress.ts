import { IAddress } from "../../../../../domain/address";
import { InternalServerError } from "../../../../../usecases/handler/internalServerError";
import { addressModel } from "../../models/addressModel";

export const createNewAddress = async(newAddress:IAddress, addressModelInstance:typeof addressModel):Promise<IAddress> => {
    try {
        const response = await addressModelInstance.create(newAddress);
        return response;
    } catch (error) {
        throw new InternalServerError('Data Storing Server Error.')
    }
}