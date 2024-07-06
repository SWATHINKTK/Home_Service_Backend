import Stripe from "stripe";
import { IStripe } from "../../usecases/interface/services/IStripe";
import { IBookingRequestData } from "../types/booking";

export class StripePaymentIntegration implements IStripe {

    private readonly stripe: Stripe;
    constructor() {
        this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '');
    }
    async createCustomer(name: string, phone: string, email: string): Promise<Stripe.Customer> {
        const customer = await this.stripe.customers.create({
            name,
            email,
            phone
        });
        return customer
    }
    async stripeCheckoutSession(serviceName: string, metadata:{[key:string]:any}, amount: number, customerId: string, success_url: string, cancel_url: string): Promise<Stripe.Checkout.Session> {
        console.log("---------------------------------------------------------")
        console.log(metadata)
        const session = await this.stripe.checkout.sessions.create({
            line_items: [
                {
                    price_data: {
                        currency: 'inr',
                        product_data: {
                            name: serviceName
                        },
                        unit_amount: amount * 100,
                    },
                    quantity: 1
                },

            ],
            mode: 'payment',
            payment_method_types: ['card'],
            //   customer: customerId,
            success_url: success_url,
            cancel_url: cancel_url,
            metadata
        });
        return session;
    }

    async stripeEventConstruction(signature: string, payload: Buffer): Promise<Stripe.Event> {
        try {
            const endpointSecret = process.env.ENDPOINT_SECRET || '';
            const event = this.stripe.webhooks.constructEvent(payload, signature, endpointSecret);
            return event
        } catch (error) {
            console.log('Stripe Error', error)
            throw error
        }
    }

    async paymentIntentMethod(amount: number, bookingId: string) {
        try {
            const session = await this.stripe.paymentIntents.create({
                amount,
                currency: 'inr',
                metadata: {
                    bookingId
                }
            });
            return session;
        } catch (error) {
            throw error;
        }
    }
}