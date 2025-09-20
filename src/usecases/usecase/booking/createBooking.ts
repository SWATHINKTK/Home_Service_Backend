import { IServerResponse } from "../../../infrastructure/types/IResponse";
import { IBookingRequestData, PaymentStatus } from "../../../infrastructure/types/booking";
import { BadRequestError } from "../../handler/badRequestError";
import { IBookingRepository } from "../../interface/repository/IBookingRepository";
import { IServiceRepository } from "../../interface/repository/IServiceRepository";
import { IAddressRepository } from '../../interface/repository/IAddressRepositry';

export const createBooking = async(userId:string, advancePaymentAmount:number, bookingData:IBookingRequestData, bookingRepository:IBookingRepository, AddressRepository:IAddressRepository, serviceRepository:IServiceRepository):Promise<IServerResponse> => {
    try {
        console.log("++++++++++++++++ CREATE BOOKING +++++++++++++++++++", bookingData)
        const service = await serviceRepository.findService({_id:bookingData.serviceId});
        if(!service){
            throw new BadRequestError('ServiceId is Invalid');
        }

        const addressDoc = await AddressRepository.findAddressById(bookingData.locationId);
        if(!addressDoc){
            throw new BadRequestError('LocationId is Invalid');
        }

        const address = { ...addressDoc };

        delete address.userId;
        delete address.__v;
        delete address._id;


        console.log('addressDoc', addressDoc)


        const generateUniqueId = () => {
            const timestamp = Date.now(); 
            const randomNum = Math.floor(Math.random() * 1000000); 
            return `${timestamp}${randomNum}`;
        };

        const bookingStoreData ={
            bookingId:generateUniqueId(),
            userId,
            serviceMinimumAmount:service.minimumAmount,
            serviceHourlyCharge:service.hourlyAmount,
            ...bookingData,
            address,
            advancePaymentAmount,
            advancePaymentStatus: PaymentStatus.COMPLETED,
            totalAmount:0                  
        }

        const booking = await bookingRepository.createBooking(bookingStoreData);
        console.log('booking', booking)
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