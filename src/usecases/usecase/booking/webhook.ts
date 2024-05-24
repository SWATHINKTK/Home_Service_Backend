import Stripe from "stripe";
import { IServiceRepository } from "../../interface/repository/IServiceRepository";
import { IStripe } from "../../interface/services/IStripe";
import { IBookingRepository } from "../../interface/repository/IBookingRepository";

export const webhook = async(signature:string, payload:Buffer, serviceRepository:IServiceRepository, bookingRepository:IBookingRepository, stripeService:IStripe) => {
    try {
        const event = await stripeService.stripeEventConstruction(signature, payload);
        const data = event.data.object;
        const eventType = event.type;
        if(eventType == 'checkout.session.completed'){
            
            console.log('Data',data)
        }
    } catch (error) {
        throw error;
    }
}