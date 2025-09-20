import { IAddress } from "../../../../../domain/address";
import { BadRequestError } from "../../../../../usecases/handler/badRequestError";
import { addressModel } from "../../models/addressModel";

export const findAddressById = async(addressId:string, addressModelInstance:typeof addressModel):Promise<IAddress | null> => {
    try {
        const address = await addressModelInstance.findOne({_id: addressId});
        return address;
    } catch (error) {
        console.log("Find Address By Id Repository Error", error)
        throw new BadRequestError('Data Storing Server Error.')
    }
}