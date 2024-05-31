import { IBookingRequestData } from "../../infrastructure/types/booking";
import { BadRequestError } from "../handler/badRequestError";
import { IBookingRepository } from "../interface/repository/IBookingRepository";
import { IServiceRepository } from "../interface/repository/IServiceRepository";
import { IUserRepository } from "../interface/repository/IUserRepository";
import { IEmailService } from "../interface/services/IEmailService";
import { IStripe } from "../interface/services/IStripe";
import { advanceBookingPayment } from "./booking/advanceBookingPayment";
import { createBooking } from "./booking/createBooking";
import { cancelBooking } from "./booking/cancelBooking";
import { acceptWork } from "./booking/acceptWork";
import { viewWorkerSpecificBooking } from "./booking/viewWorkerBooking";
import { IWorkerRepository } from "../interface/repository/IWorkerRepository";
import { viewUserBooking } from "./booking/viewUserBooking";
import { IOTPService } from "../interface/services/IOTPService";
import { verifyWork } from "./booking/verifyWork";


export class BookingUseCase {
    private readonly _userRepository: IUserRepository;
    private readonly _workerRepository: IWorkerRepository;
    private readonly _serviceRepository: IServiceRepository;
    private readonly _bookingRepository: IBookingRepository;
    private readonly _emailService: IEmailService;
    private readonly _stripeService: IStripe;
    private readonly _otpService: IOTPService;

    constructor(
        userRepository: IUserRepository,
        workerRepository: IWorkerRepository,
        serviceRepository: IServiceRepository,
        bookingRepository: IBookingRepository,
        emailService: IEmailService,
        stripeService: IStripe,
        otpService:IOTPService
    ) {
        this._userRepository = userRepository;
        this._workerRepository = workerRepository;
        this._serviceRepository = serviceRepository;
        this._bookingRepository = bookingRepository;
        this._emailService = emailService;
        this._stripeService = stripeService;
        this._otpService = otpService;
    }

    async advanceBookingPayment(
        userId: string,
        userEmail: string,
        bookingData: IBookingRequestData
    ) {
        console.log("bookingDataUsecase", bookingData);
        return advanceBookingPayment(
            userId,
            userEmail,
            bookingData,
            this._userRepository,
            this._serviceRepository,
            this._stripeService
        );
    }

    async webhook(signature: string, payload: Buffer) {
        try {
            const event = await this._stripeService.stripeEventConstruction(signature, payload);
            const data = event.data.object as any;
            const eventType = event.type;
            if(eventType == 'checkout.session.completed'){
                const userId = data.metadata.userId;
                const advancePaymentAmount = parseFloat(data.metadata.amount);
                const bookingData: IBookingRequestData = JSON.parse(data.metadata.bookingData);
                const booking = await this.createBooking(userId, advancePaymentAmount, bookingData);
                return booking;
            }
        } catch (error:unknown) {
            if (error instanceof Error) {
                throw new BadRequestError(error.message);
            } else {
                throw new BadRequestError('Unknown error occurred');
            }
        }
    }


    async createBooking(userId:string, advancePaymentAmount:number, bookingData:IBookingRequestData){
        return createBooking(userId, advancePaymentAmount, bookingData, this._bookingRepository, this._serviceRepository);
    }

    async viewUserBooking(userId:string,history:boolean){
        return viewUserBooking(userId, history, this._bookingRepository)
    }

    async viewWorkerSpecificBooking(workerId:string,){
        return viewWorkerSpecificBooking(workerId, this._workerRepository, this._bookingRepository);
    }

    async cancelBooking(userId:string, {status, bookingId}:{status:string, bookingId:string}){
        return cancelBooking(userId,status, bookingId, this._bookingRepository)
    }

    async acceptWork(workerId:string, { bookingId}:{bookingId:string}){
        return acceptWork(workerId, bookingId, this._bookingRepository);
    }

    async verifyWork(workerId:string, {bookingId, userEmail}:{bookingId:string, userEmail:string}){
        return verifyWork(workerId, bookingId, userEmail, this._bookingRepository, this._otpService, this._emailService)
    }
}