import { IAddress } from "../../../domain/address";
import { IServerResponse } from "../../../infrastructure/types/IResponse";
import { BadRequestError } from "../../handler/badRequestError";
import { IAddressRepository } from "../../interface/repository/IAddressRepositry";
import { IRequestValidator } from "../../interface/services/IRequestValidator";

export const createNewAddress = async(newAddress:IAddress, userId:string, addressRepository:IAddressRepository, requestValidator:IRequestValidator):Promise<IServerResponse> => {
    try {
        const addressValidation = requestValidator.validateRequiredFields(newAddress, ['buildingName', 'location', 'locationDetails', 'phoneNumber']);
        console.log(addressValidation)
        if(!addressValidation.success){
            throw new BadRequestError(addressValidation.message);
        }
        newAddress.userId = userId
        const addNew = await addressRepository.createNewAddress(newAddress);
        return {
            statusCode:200,
            success:true,
            message:addNew
        }
    } catch (error) {
        throw error;
    }
}