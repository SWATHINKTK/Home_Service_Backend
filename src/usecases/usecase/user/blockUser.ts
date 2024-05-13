import { BadRequestError } from "../../handler/badRequestError";
import { IUserRepository } from "../../interface/repository/IUserRepository";
import { IServerResponse } from "../../../infrastructure/types/IResponse";

export const blockUser = async( 
    userRepository:IUserRepository, 
    userId:string 
):Promise<IServerResponse>=>{
    try {
        const userBlock = await userRepository.updateUserBlockStatus(userId)
        return {
            statusCode:200,
            success:true,
            message:userBlock
        }
    } catch (error) {
        throw error;
    }
}