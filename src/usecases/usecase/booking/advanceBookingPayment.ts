import { IServerResponse } from "../../../infrastructure/types/IResponse";
import { IBookingRequestData } from "../../../infrastructure/types/booking";
import { NotFoundError } from "../../handler/notFoundError";
import { IServiceRepository } from "../../interface/repository/IServiceRepository";
import { IUserRepository } from "../../interface/repository/IUserRepository";
import { IStripe } from "../../interface/services/IStripe";

export const advanceBookingPayment = async(
    userId:string,
  userEmail: string,
  bookingData:IBookingRequestData,
  userRepository: IUserRepository,
  serviceRepository:IServiceRepository,
  stripeService: IStripe
):Promise<IServerResponse> => {
    console.log('stripe Advance booking',bookingData)
    const service = await serviceRepository.findService({_id:bookingData.serviceId});
    if(!service){
        throw new NotFoundError('Service is not found.try again');
    }

    const success_url = process.env.ADVANCE_PAYMENT_SUCCESS_URL || 'http://localhost:5173/success';
    const cancel_url = process.env.ADVANCE_PAYMENT_CANCEL_URL || 'http://localhost:5173/failed'
    const payingAmount = service.minimumAmount / 5 ;

    const session = await stripeService.stripeCheckoutSession(service.serviceName, bookingData, userId, payingAmount,'cus_Q9QHGjKyhfHx6Z',success_url, cancel_url);
    return {
        statusCode:200,
        success:true,
        message:'Stripe Session Verification Id Creation Successful',
        data:session.id
    }
};
