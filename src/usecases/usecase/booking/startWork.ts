import { IUser } from "../../../domain/user";
import { IServerResponse } from "../../../infrastructure/types/IResponse";
import { WorkStatus } from "../../../infrastructure/types/booking";
import { BadRequestError } from "../../handler/badRequestError";
import { IBookingRepository } from "../../interface/repository/IBookingRepository";
import { IEmailService } from "../../interface/services/IEmailService";
import { IOTPService } from "../../interface/services/IOTPService";

export const startWork = async (
  workerId: string,
  bookingId: string,
  userEmail: string,
  bookingRepository: IBookingRepository,
  otpService: IOTPService,
  emailService: IEmailService
):Promise<IServerResponse> => {
    try {
        console.log(bookingId, workerId, userEmail)
        if(!bookingId || !workerId || !userEmail){
            throw new BadRequestError('Request Sending Invalid Data')
        }
        const otp = otpService.generateOTP();
        const query = [
            {_id:bookingId, workerId},
            {workStatus:WorkStatus.IN_PROGRESS, otp:otp, otpTime:new Date()}
        ]
        const booking = await bookingRepository.updateBookingStatus(query);

        const html = `<div style="width: 90%; background-color: #007bff; padding: 20px;">
                        <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 10px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
                            <div style="padding: 40px;">
                                <h2 style="font-size: 24px; color: #333333; margin-bottom: 20px; text-align: center;">Hi there,</h2>
                                <p style="font-size: 18px; color: #666666; margin-bottom: 30px; text-align: center;">Thank you for booking a service with us. To ensure security, please use the following OTP to verify your booking:</p>
                                <div style="text-align: center; margin-bottom: 40px;">
                                    <h1 style="font-size: 48px; color: #ffffff; background-color: #007bff; padding: 10px 20px; border-radius: 5px;">${otp}</h1>
                                </div>
                                <p style="font-size: 16px; color: #666666; margin-bottom: 20px; text-align: center;">Please use this OTP to confirm the start of work related to the service booking.</p>
                                <p style="font-size: 16px; color: #666666; margin-bottom: 0; text-align: center;">Thank you for choosing our services!</p>
                            </div>
                        </div>
                    </div>`;
    await emailService.sendEmail(userEmail, 'Verify Work', html);
    return {
        statusCode:200,
        success:true,
        message:'Verification OTP Send to User',
        data:booking
    }

    } catch (error) {
        throw error;  
    }
};
