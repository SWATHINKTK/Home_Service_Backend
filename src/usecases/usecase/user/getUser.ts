import { BadRequestError } from "../../handler/badRequestError";
import { IUserRepository } from "../../interface/repository/IUserRepository";
import { IServerResponse } from "../../interface/services/IResponse";

export const getUser = async (userEmail:string, userRepository: IUserRepository):Promise<IServerResponse> => {
    try {
        const userData = await userRepository.findUser(userEmail);
        if(!userData){
            throw new BadRequestError("User Is Does not Exist");
        }
        return {
            statusCode:200,
            success:true,
            message: "User profile retrieved successfully.",
            data: userData
        }
    } catch (error) {
        throw error
    }
}