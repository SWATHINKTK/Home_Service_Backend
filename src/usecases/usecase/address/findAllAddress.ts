import { IServerResponse } from "../../../infrastructure/types/IResponse";
import { IAddressRepository } from "../../interface/repository/IAddressRepositry";

export const findAllAddress = async(userId:string, addressRepository:IAddressRepository):Promise<IServerResponse> => {
    try {
        const allAddress = await addressRepository.findAllAddress(userId);
        return{
             statusCode:200,
             success:true,
             message:'All Address Retrieved Successful.',
             data:allAddress
        }
    } catch (error) {
        throw error;
    }
}