import { AdminAdapter } from "../../../../controllers/adminAdapter";
import { AdminUseCase } from "../../../../usecases/usecase/adminUsecase";
import { adminModel } from "../../../database/mongodb/models/adminModel";
import { bookingModel } from "../../../database/mongodb/models/bookingModel";
import { userModel } from "../../../database/mongodb/models/userModel";
import { AdminRepository } from "../../../database/mongodb/repository/adminRepository";
import { BookingRepository } from "../../../database/mongodb/repository/bookingRepository";
import { UserRepository } from "../../../database/mongodb/repository/userRepository";
import { JWTService } from "../../../services/jwtService";
import { SecretHasher } from "../../../services/secrectHasherService";

const adminRepository = new AdminRepository(adminModel);
const userRepository = new UserRepository(userModel);
const jwtService = new JWTService();
const secretHashService = new SecretHasher();
const bookingRepository = new BookingRepository(bookingModel);


const adminUsecase =  new AdminUseCase( adminRepository, secretHashService, jwtService, userRepository, bookingRepository);

export const adminAdapter = new AdminAdapter(adminUsecase);