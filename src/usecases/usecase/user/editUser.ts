import { profile } from "winston";
import { BadRequestError } from "../../handler/badRequestError";
import { IUserRepository } from "../../interface/repository/IUserRepository";
import { IServerResponse } from "../../../infrastructure/types/IResponse";

export const editUserProfile = async(
    userEmail:string,
    firstname:string,
    lastname:string,
    phoneNumber:string,
    district:string,
    userImage: { [fieldname: string]: Express.Multer.File[] },
    userRepository:IUserRepository
):Promise<IServerResponse> => {
    try {
        if(!userEmail || !firstname || !lastname || !phoneNumber || !district){
            throw new BadRequestError('Request Failed.Ensure Our data.')
        }

        const existingUser = await userRepository.findUser({email:userEmail});
        if(!existingUser){
            throw new BadRequestError('User Does Not Exist.')
        }

        const profile = userImage && userImage["profile"] && userImage["profile"][0] && (userImage["profile"][0] as any).location ;
       
    
        const updatedData = {
            firstname,
            lastname,
            phoneNumber,
            district,
            profile,
        }
        const updateUserData = await userRepository.updateUserData(userEmail, updatedData);
        return {
            statusCode:200,
            success:true,
            message:'User Data Updated Successfully.'
        }
    } catch (error) {
        throw error;
    }
    

}