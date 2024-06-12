import { IServerResponse } from "../../../infrastructure/types/IResponse";
import { NotFoundError } from "../../handler/notFoundError";
import { IBookingRepository } from "../../interface/repository/IBookingRepository";
import { IStripe } from "../../interface/services/IStripe";

export const completionPayment = async (
    userId: string,
    userEmail: string,
    bookingId:string,
    serviceName:string,
    bookingRepository: IBookingRepository,
    stripeService:IStripe
):Promise<IServerResponse> => {
    try {
        const booking = await bookingRepository.findBooking({userId, _id:bookingId});
        if(!booking){
            throw new NotFoundError('booking is invalid.')
        }
        
        const success_url = process.env.PAYMENT_SUCCESS_URL+`?completed=${true}` || `http://localhost:5173/success?completed=${true}`;
        const cancel_url = process.env.PAYMENT_CANCEL_URL+`?completed=${true}` || `http://localhost:5173/failed?completed=${true}`;
        const metadata = {
            bookingId,
            workerId:booking.workerId?.toString(),
            totalAmount:booking.totalAmount,
            completion:true
        }
        const session = await stripeService.stripeCheckoutSession(serviceName, metadata, booking.totalAmount,'cus_Q9QHGjKyhfHx6Z',success_url, cancel_url);
        return {
            statusCode:200,
            success:true,
            message:'Stripe Session Verification Id Creation Successful',
            data:session.id
        }

    } catch (error) {
        throw error;
    }
};
