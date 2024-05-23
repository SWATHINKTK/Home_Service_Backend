import Stripe from "stripe";
import { IBookingRequestData } from "../../../infrastructure/types/booking";

export interface IStripe{
    createCustomer(name:string, phone:string, email:string):Promise<Stripe.Customer>;
    stripeCheckoutSession(serviceName:string, bookingData:IBookingRequestData, userId:string, amount:number, customerId:string, success_url:string, cancel_url:string):Promise<Stripe.Checkout.Session>;
    stripeEventConstruction(signature:string, payload:Buffer):Promise<Stripe.Event>;
}