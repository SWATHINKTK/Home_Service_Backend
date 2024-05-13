import { BadRequestError } from "../../handler/badRequestError";
import { IUserRepository } from "../../interface/repository/IUserRepository";
import { IServerResponse } from "../../../infrastructure/types/IResponse";

export const findAllUsers = async(userRepository:IUserRepository):Promise<IServerResponse> =>{
    try {
        const users = await userRepository.findAllUsers();
        return {
            statusCode:200,
            success:true,
            message:'All User Listing Successful.',
            data:users
        }
    } catch (error) {
        throw new BadRequestError('Server Error');
    }
}