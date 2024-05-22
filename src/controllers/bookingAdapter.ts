import Stripe from "stripe";
import { Next, Req, Res } from "../infrastructure/types/expressTypes";
import { BookingUseCase } from "../usecases/usecase/bookingUseCase";

interface CustomReq extends Req {
    user?: string;
    userId?:string;
}

export class BookingAdapter {
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
            const response = await this._bookingUseCase.webhook(signature, req.body)
//             const sig = req.headers['stripe-signature'] as string;
//             const endpointSecret = "whsec_7b8750c713fbec3221d6800691e33e7505ac04bb2d96488387a7887264d25704";
//             const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || ''); 
//             const body = req.body;
// // console.log( req.body.toString())
//             let event;

//             try {
//                 event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
//             } catch (err:any) {
//                 console.log(err);
//                 res.status(400).send(`Webhook Error: ${err.message}`);
//                 return;
//             }

//             const data = event.data.object;
//             const eventType = event.type;

//             console.log('success', data, eventType);


//             res.status(200).send({ received: true });
        } catch (error) {
            next(error);
        }
    }
}