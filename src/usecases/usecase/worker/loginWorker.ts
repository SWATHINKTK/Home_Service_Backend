


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

import { BadRequestError } from "../../handler/badRequestError";
import { IWorkerRepository } from "../../interface/repository/IWorkerRepository";
import { IServerResponse } from "../../../infrastructure/types/IResponse";
import { ISecretHasher } from "../../interface/services/ISecretHasher";
import { IJWT } from "../../interface/services/Ijwt";

export const loginWorker = async (
    phoneNumber: string,
    password: string,
    workerRepository: IWorkerRepository,
    secretHashService: ISecretHasher,
    jwtService: IJWT,
): Promise<IServerResponse> => {
    try {

        // ** Checking This Worker is Already Exist or Not
        const query = { phoneNumber: phoneNumber }
        const existingWorker = await workerRepository.findWorker(query);

        // If user does not exist, throw a BadRequestError
        if (!existingWorker?._isVerified) {
            throw new BadRequestError('Worker is not Verified on Admin')
        }

        // If user does not exist, throw a BadRequestError
        if (!existingWorker) {
            throw new BadRequestError('Invalid user data')
        }

        // Check if the provided password matches the hashed password stored in the database
        const checkCredentials = await secretHashService.checkSecretMatch(password, existingWorker.password);

        // If password does not match, throw a BadRequestError
        if (!checkCredentials) {
            throw new BadRequestError('Invalid user data.Please Check Phone Number & password.')
        }

        // Generate a JWT token for the authenticated user
        const tokenCredential = {
            _id:existingWorker._id,
            phoneNumber:existingWorker.phoneNumber,
            role:"worker"
        }
        const token = jwtService.createJWT(tokenCredential);

        // Omit the password field from the user data in the response
        existingWorker.password = '';

        // Return a success response with user data and JWT token
        return {
            statusCode: 200,
            success: true,
            message: 'Worker Logged Successfully',
            data: existingWorker,
            token: token
        }

    } catch (error) {
        // Throw any caught errors for handling at a higher level
        throw error;
    }
};
