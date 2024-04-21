import { IUser } from "../../../domainLayer/user";
import { BadRequestError } from "../../handler/badRequestError";
import { IUserRepository } from "../../interface/repository/IUserRepository";
import { IOTPService } from "../../interface/services/IOTPService";
import { IServerResponse } from "../../interface/services/IResponse";
import { ISecretHasher } from "../../interface/services/ISecretHasher";

export const createUser = async (
    userRepository: IUserRepository,
    secretHashService:ISecretHasher,
    otpService:IOTPService,
    firstname: string,
    lastname: string,
    email: string,
    phoneNumber: string,
    district: string,
    password: string,
    userEnteredOTP :string

):Promise<IServerResponse> => {

    try {
        const existingUser = await userRepository.findUser(email);
        if (existingUser) {
            throw new BadRequestError('User is already exist.')
        }

        const otpVerification = otpService.verifyOTP(userEnteredOTP,email);
        if(!otpVerification.success){
            throw new BadRequestError(otpVerification.message);
        }


        const hashPassword = await secretHashService.hashSecret(password)
        const newUser = {
            firstname,
            lastname,
            email,
            phoneNumber,
            district,
            password:hashPassword
        }
        

        const createNewUser = await userRepository.createUser(newUser);
        newUser.password = '';
        return {
            statusCode:200,
            success:true,
            message:'Congratulations! Your registration was successful.',
            data:newUser
        }
        
    } catch (error) {
        throw error
    }
}