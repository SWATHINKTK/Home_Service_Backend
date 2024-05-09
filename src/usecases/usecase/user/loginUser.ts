import { BadRequestError } from "../../handler/badRequestError";
import { IUserRepository } from "../../interface/repository/IUserRepository";
import { IServerResponse } from "../../interface/services/IResponse";
import { ISecretHasher } from "../../interface/services/ISecretHasher";
import { IJWT } from "../../interface/services/Ijwt";


/**
 * * Authenticates a user with provided credentials and generates a JWT token upon successful authentication.
 * 
 * @param  userRepository - The repository for user data.
 * @param  secretHashService - The service used for hashing sensitive data like passwords.
 * @param  jwtService - The service used for JWT (JSON Web Token) generation and verification.
 * @param  username - The username or email of the user.
 * @param  password - The password for the user account.
 * 
 * @returns {Promise<IServerResponse>} A promise resolving with a server response containing user data and JWT token upon successful login.
 */

export const loginUser = async(
  userRepository: IUserRepository,
  secretHashService: ISecretHasher,
  jwtService: IJWT,
  username: string,
  password: string
):Promise<IServerResponse> => {
    try {

        // Find user in the repository using the provided username
        const existingUser = await userRepository.findUser(username);

        // If user does not exist, throw a BadRequestError
        if(!existingUser){
            throw new BadRequestError('Invalid user data')
        }

        // Check if the provided password matches the hashed password stored in the database
        const checkCredentials = await secretHashService.checkSecretMatch(password, existingUser.password);
        
        // If password does not match, throw a BadRequestError
        if(!checkCredentials){
            throw new BadRequestError('Invalid user data.Please Check email & password.')
        }

        // Generate a JWT token for the authenticated user
        const token = await jwtService.createJWT(existingUser._id, username, "User");
        
        // Omit the password field from the user data in the response
        const sendUserData = {
            firstname:existingUser.firstname,
            lastname:existingUser.lastname,
            profile:existingUser.profile ?? null,
            createdAt:existingUser.createdAt
        }

        // Return a success response with user data and JWT token
        return {
            statusCode:200,
            success:true,
            message:'User Logged Successfully',
            data: sendUserData,
            token:token
        }
        
    } catch (error) {
        // Throw any caught errors for handling at a higher level
        throw error;
    }
};
