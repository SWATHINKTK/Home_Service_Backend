
import { BadRequestError } from "../../handler/badRequestError";
import { IUserRepository } from "../../interface/repository/IUserRepository";
import { IEmailService } from "../../interface/services/IEmailService";
import { IOTPService } from "../../interface/services/IOTPService";
import { IServerResponse } from "../../../infrastructure/types/IResponse";
import { ISecretHasher } from "../../interface/services/ISecretHasher";


/**
 * *Generates and sends an OTP (One-Time Password) to the user's email address for verification during account registration.
 * 
 * @param firstname - The first name of the user.
 * @param lastname - The last name of the user.
 * @param emailAddr - The email address of the user.
 * @param userRepository - The repository for user data.
 * @param emailService - The service used for sending emails.
 * @param otpService - The service used for OTP generation and storage.
 * @param secretHashService - The service used for hashing sensitive data like OTPs.
 * 
 * @returns {Promise<IServerResponse>} A promise resolving with a server response indicating the outcome of OTP generation and sending process.
 */
export const sendOTP = async (
    firstname: string,
    lastname: string,
    emailAddr: string,
    userRepository: IUserRepository,
    emailService: IEmailService,
    otpService: IOTPService,
    secretHashService: ISecretHasher
): Promise<IServerResponse> => {
    try {

        // Check the user is already exists with the provided email address.
        const existingUser = await userRepository.findUser({email:emailAddr});
        if (existingUser) {
            throw new BadRequestError("User is already exist.");
        }

        // Generate and store OTP for the user
        const otp = otpService.generateAndStoreOTP(emailAddr);

        // Hash the OTP before sending. 
        const hashOTP = await secretHashService.hashSecret(otp);

        const html = `<div style="width: 90%; background-color: #007bff; padding: 20px;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 10px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
            <div style="padding: 40px;">
                <h2 style="font-size: 24px; color: #333333; margin-bottom: 20px; text-align: center;">Hi ${firstname + " " + lastname
            }, Welcome to Our Website!</h2>
                <p style="font-size: 18px; color: #666666; margin-bottom: 30px; text-align: center;">Please use the following OTP to verify your account:</p>
                <div style="text-align: center; margin-bottom: 40px;">
                    <h1 style="font-size: 48px; color: #ffffff; background-color: #007bff; padding: 10px 20px; border-radius: 5px;">${otp}</h1>
                </div>
                <p style="font-size: 16px; color: #666666; margin-bottom: 20px; text-align: center;">This OTP is valid for a limited time.</p>
                <p style="font-size: 16px; color: #666666; margin-bottom: 0; text-align: center;">Thank you for joining!</p>
            </div>
        </div>
    </div>
    `;
        const email = await emailService.sendEmail(
            emailAddr,
            "Your OTP for Verification",
            html
        );


        return {
            statusCode: 200,
            success: true,
            message: "OTP sent successfully to your email address.",
            data: hashOTP
        }

    } catch (error) {
        throw error;
    }
};
