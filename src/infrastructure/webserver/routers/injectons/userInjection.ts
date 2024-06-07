import { UserAdapter } from "../../../../controllers/userAdapter";
import { UserUseCase } from "../../../../usecases/usecase/userUsecase";
import { userModel } from "../../../database/mongodb/models/userModel";
import { UserRepository } from "../../../database/mongodb/repository/userRepository";
import { EmailService } from "../../../services/emailService";
import { JWTService } from "../../../services/jwtService";
import { OTPService } from "../../../services/otpService";
import { SecretHasher } from "../../../services/secrectHasherService";


const userRepositories = new UserRepository(userModel);
const emailService = new EmailService();
const otpService = new OTPService();
const secretHashService = new SecretHasher();
const jwtService = new JWTService();
const userUsecase = new UserUseCase(
    userRepositories,
    emailService,
    otpService,
    secretHashService,
    jwtService
);
export const UserAdapters = new UserAdapter(userUsecase);
