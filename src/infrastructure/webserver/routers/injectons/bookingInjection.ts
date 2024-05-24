import { BookingAdapter } from "../../../../controllers/bookingAdapter";
import { BookingUseCase } from "../../../../usecases/usecase/bookingUseCase";
import { bookingModel } from "../../../database/mongodb/models/bookingModel";
import { serviceModel } from "../../../database/mongodb/models/serviceModel";
import { userModel } from "../../../database/mongodb/models/userModel";
import { BookingRepository } from "../../../database/mongodb/repository/bookingRepository";
import { ServiceRepository } from "../../../database/mongodb/repository/serviceRepository";
import { UserRepository } from "../../../database/mongodb/repository/userRepository";
import { EmailService } from "../../../services/emailService";
import { StripePaymentIntegration } from "../../../services/stripeService";

const userRepository = new UserRepository(userModel);
const serviceRepository = new ServiceRepository(serviceModel);
const bookingRepository = new BookingRepository(bookingModel)
const emailService = new EmailService();
const stripePayment = new StripePaymentIntegration();
const bookingUseCase = new BookingUseCase(userRepository, serviceRepository, bookingRepository, emailService, stripePayment);

export const BookingAdapters = new BookingAdapter(bookingUseCase); 