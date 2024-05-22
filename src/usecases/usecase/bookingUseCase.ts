import { IBookingRequestData } from "../../infrastructure/types/bookingRequest";
import { IServiceRepository } from "../interface/repository/IServiceRepository";
import { IUserRepository } from "../interface/repository/IUserRepository";
import { IEmailService } from "../interface/services/IEmailService";
import { IStripe } from "../interface/services/IStripe";
import { advanceBookingPayment } from "./booking/advanceBookingPayment";
import { webhook } from "./booking/webhook";

export class BookingUseCase{
    
    private readonly _userRepository: IUserRepository;
    private readonly _ServiceRepository: IServiceRepository;
    private readonly _emailService: IEmailService;
    private readonly _stripeService:IStripe;
    constructor(userRepository:IUserRepository,serviceRepository:IServiceRepository, emailService:IEmailService, stripeService:IStripe){
        this._userRepository = userRepository;
        this._ServiceRepository = serviceRepository;
        this._emailService = emailService;
        this._stripeService = stripeService;
    }

    async advanceBookingPayment(userId:string, userEmail:string, bookingData:IBookingRequestData){
        console.log('bookingDataUsecase',bookingData)
        return advanceBookingPayment(userId, userEmail, bookingData, this._userRepository,this._ServiceRepository, this._stripeService);
    }

    async webhook(signature:string, payload:Buffer){
        return webhook(signature, payload, this._ServiceRepository, this._stripeService)
    }
}