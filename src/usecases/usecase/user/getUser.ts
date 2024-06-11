import { BadRequestError } from "../../handler/badRequestError";
import { IUserRepository } from "../../interface/repository/IUserRepository";
import { IServerResponse } from "../../../infrastructure/types/IResponse";

export const getUser = async (query:Record<string, any>, userRepository: IUserRepository):Promise<IServerResponse> => {
    try {
        const userData = await userRepository.findUser(query);
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