import { UserAdapter } from "../../../../controllerLayer/userAdapter";
import { UserUseCase } from "../../../../usecaseLayer/usecase/userUsecase";
import { userModel } from "../../../database/mongodb/models/userModel";
import { userRepository } from "../../../database/mongodb/repository/userRepository";
import { EmailService } from "../../../services/emailService";
import { OTPService } from "../../../services/otpService";
import { SecretHasher } from "../../../services/secrectHasherService";

const userRepositories = new userRepository(userModel);
const emailService = new EmailService();
const otpService = new OTPService();
const secretHashService = new SecretHasher();
const userUsecase = new UserUseCase(userRepositories,emailService,otpService,secretHashService);
export const UserAdapters = new UserAdapter(userUsecase);