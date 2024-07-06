import { IAddress } from "../../../../../domain/address";
import { InternalServerError } from "../../../../../usecases/handler/internalServerError";
import { addressModel } from "../../models/addressModel";

export const findAllAddress = async(userId:string, addressModelInstance:typeof addressModel):Promise<IAddress[]> => {
    try {
        const allAddress = await addressModelInstance.find({userId});
        return allAddress;
    } catch (error) {
        throw new InternalServerError('Data Storing Server Error.')
    }
}