import Stripe from "stripe";
import { Next, Req, Res } from "../infrastructure/types/expressTypes";
import { BookingUseCase } from "../usecases/usecase/bookingUseCase";
import { BadRequestError } from "../usecases/handler/badRequestError";

interface CustomReq extends Req {
    user?: string;
    userId?:string;
}

export class BookingAdapter{

    private readonly _bookingUseCase: BookingUseCase;
    constructor(_bookingUseCase: BookingUseCase) {
        this._bookingUseCase = _bookingUseCase;
    }

    async advanceBookingPayment(req: CustomReq, res: Res, next: Next) {
        try {
            const userEmail = req.user;
            const userId = req.userId;
            const booking = await this._bookingUseCase.advanceBookingPayment(userId!, userEmail!, req.body);
            res.status(booking.statusCode).json({
                success: booking.success,
                message: booking.message,
                data: booking.data
            });
        } catch (error) {
            next(error)
        }
    }

    async webhook(req: Req, res: Res, next: Next) {
        try {
            const signature = req.headers['stripe-signature'] as string;
            const response = await this._bookingUseCase.webhook(signature, req.body);
            if (response) {
                res.status(response.statusCode).json({
                    success: response.success,
                    message: response.message
                });
            } else {
                throw new BadRequestError('No response received from webhook processing');
            }
        } catch (error) {
            next(error);
        }
    }

    async userSpecificBookings(req:Req, res:Res, next:Next){
        try {
            const userId = req.userId;
            const history = !!req.query.history || false;
            const allBookings = await  this._bookingUseCase.viewUserBooking(userId!, history);
            console.log(allBookings)
            res.status(allBookings.statusCode).json({
                success:allBookings.success,
                message:allBookings.message,
                data:allBookings.data
            })
        } catch (error) {
            next(error);
        }
    }


    async cancelBooking(req:Req, res:Res, next:Next){
        try {
            const userId = req.userId;
            const cancelBooking = await this._bookingUseCase.cancelBooking(userId!, req.body);
            res.status(cancelBooking.statusCode).json({
                success:cancelBooking.success,
                message:cancelBooking.message,
                data:cancelBooking.data
            })
        } catch (error) {
            next(error)
        }
    }

    async workerSpecificBookings(req:Req, res:Res, next:Next){
        try {
            const workerId = req.workerId;
            const bookings = await this._bookingUseCase.viewWorkerSpecificBooking(workerId!);
            res.status(bookings.statusCode).json({
                success:bookings.success,
                message:bookings.message,
                data:bookings.data
            })
        } catch (error) {
            next(error)
        }
    }

    async acceptWork(req:Req, res:Res, next:Next){
        try {
            const workerId = req.workerId
            const acceptedWork = await this._bookingUseCase.acceptWork(workerId!, req.body);
            res.status(acceptedWork.statusCode).json({
                success:acceptedWork.success,
                message:acceptedWork.message,
                data:acceptedWork.data
            })
        } catch (error) {
            next(error)
        }
    }
}
