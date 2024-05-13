import { IUserRepository } from "../../interface/repository/IUserRepository";
import { IServerResponse } from "../../../infrastructure/types/IResponse";

export const googleSignin = async(
    firstname: string,
    lastname: string,
    email: string,
    phoneNumber: string,
    district: string,
    password: string,
    userRepository:IUserRepository
):Promise<IServerResponse> => {
    try {
        const user = await userRepository.findUser("");
        return {
            statusCode:200,
            success:true,
            message:'User Login Successful',
            data:""
        }
    } catch (error) {
        throw error
    }
}