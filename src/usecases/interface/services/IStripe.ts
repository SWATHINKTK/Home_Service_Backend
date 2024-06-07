import Stripe from "stripe";
import { IBookingRequestData } from "../../../infrastructure/types/booking";

export interface IStripe{
    createCustomer(name:string, phone:string, email:string):Promise<Stripe.Customer>;
    stripeCheckoutSession(serviceName:string, metadata:{[key:string]:any}, amount:number, customerId:string, success_url:string, cancel_url:string):Promise<Stripe.Checkout.Session>;
    stripeEventConstruction(signature:string, payload:Buffer):Promise<Stripe.Event>;
    paymentIntentMethod(amount: number, bookingId: string):Promise<Stripe.PaymentIntent>
}