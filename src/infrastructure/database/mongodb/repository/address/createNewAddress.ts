import { IAddress } from "../../../../../domain/address";
import { InternalServerError } from "../../../../../usecases/handler/internalServerError";
import { addressModel } from "../../models/addressModel";

export const createNewAddress = async(newAddress:IAddress, addressModelInstance:typeof addressModel):Promise<string> => {
    try {
        await addressModelInstance.create(newAddress);
        return "New Address Creation Successful."
    } catch (error) {
        throw new InternalServerError('Data Storing Server Error.')
    }
}