import Stripe from "stripe";
import { IServiceRepository } from "../../interface/repository/IServiceRepository";
import { IStripe } from "../../interface/services/IStripe";

export const webhook = async(signature:string, payload:Buffer, serviceRepository:IServiceRepository, stripeService:IStripe) => {
    try {
        const event = await stripeService.stripeEventConstruction(signature, payload);
        const data = event.data.object;
        const eventType = event.type;
        if(eventType == 'checkout.session.completed'){
            console.log('Data',data)
        }
        // metadata: {
        //     userId: '662879b1451b3d78a1e445e4',
        //     amount: '80',
        //     bookingData: '{"buildingName":"fdfdsa","date":"2024-05-23","startTime":"00:49","endTime":"00:49","description":"cfadf","serviceId":"663899b212c94b39fd6568c8","location":{"latitude":10.1287481,"longitude":76.8720961}}'
        //   },
    } catch (error) {
        throw error;
    }
}