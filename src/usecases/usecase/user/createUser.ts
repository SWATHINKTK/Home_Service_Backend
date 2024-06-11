
import { BadRequestError } from "../../handler/badRequestError";
import { IUserRepository } from "../../interface/repository/IUserRepository";
import { IOTPService } from "../../interface/services/IOTPService";
import { IServerResponse } from "../../../infrastructure/types/IResponse";
import { ISecretHasher } from "../../interface/services/ISecretHasher";

/**
 * Creates a new user in the system.
 * 
 * @param  userRepository - The repository for user data.
 * @param  secretHashService - The service used for hashing sensitive data like passwords.
 * @param  otpService - The service used for OTP (One-Time Password) generation and verification.
 * @param  firstname - The first name of the user.
 * @param  lastname - The last name of the user.
 * @param  email - The email address of the user.
 * @param  phoneNumber - The phone number of the user.
 * @param  district - The district of the user.
 * @param  password - The password for the user account.
 * @param  userEnteredOTP - The OTP entered by the user for verification.
 * 
 * @returns {Promise<IServerResponse>} A promise resolving with a server response indicating the outcome of the user creation process.
 */
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

        // Check if user with the same email already exists
        const existingUser = await userRepository.findUser({email});
        if (existingUser) {
            throw new BadRequestError('User is already exist.')
        }

        // Verify the OTP entered by the user
        const otpVerification = otpService.verifyOTP(userEnteredOTP,email);
        if(!otpVerification.success){
            throw new BadRequestError(otpVerification.message);
        }


        // Hash the user's password before storing it
        const hashPassword = await secretHashService.hashSecret(password)
        const newUser = {
            firstname,
            lastname,
            email,
            phoneNumber,
            district,
            password:hashPassword
        }
        

        // Save the new user to the repository
        const createNewUser = await userRepository.createUser(newUser);

        // Omit the password field from the response
        newUser.password = '';

        // Return a success response
        return {
            statusCode:200,
            success:true,
            message:'Congratulations! Your registration was successful.',
            data:newUser
        }
        
    } catch (error) {
        // Throw any caught errors for handling at a higher level
        throw error
    }
}