import { IServerResponse } from "../../../infrastructure/types/IResponse";
import { IBookingRequestData, PaymentStatus } from "../../../infrastructure/types/booking";
import { BadRequestError } from "../../handler/badRequestError";
import { IBookingRepository } from "../../interface/repository/IBookingRepository";
import { IServiceRepository } from "../../interface/repository/IServiceRepository";

export const createBooking = async(userId:string, advancePaymentAmount:number, bookingData:IBookingRequestData, bookingRepository:IBookingRepository, serviceRepository:IServiceRepository):Promise<IServerResponse> => {
    try {
        const service = await serviceRepository.findService({_id:bookingData.serviceId});
        if(!service){
            throw new BadRequestError('ServiceId is Invalid');
        }
        const bookingStoreData ={ 
            userId,
            serviceMinimumAmount:service.minimumAmount,
            serviceHourlyCharge:service.hourlyAmount,
            ...bookingData,
            advancePaymentAmount,
            advancePaymentStatus: PaymentStatus.COMPLETED,
            totalAmount:service.minimumAmount                    
        }

        const booking = await bookingRepository.createBooking(bookingStoreData);
        return {
            statusCode:200,
            success:true,
            message:'Booking Successful',
        }
    } catch (error) {
        console.log('create booing error', error)
        throw error;
    }
}