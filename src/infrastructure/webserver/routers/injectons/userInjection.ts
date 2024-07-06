import { UserAdapter } from "../../../../controllers/userAdapter";
import { UserUseCase } from "../../../../usecases/usecase/userUsecase";
import { addressModel } from "../../../database/mongodb/models/addressModel";
import { userModel } from "../../../database/mongodb/models/userModel";
import { AddressRepository } from "../../../database/mongodb/repository/addessRepository";
import { UserRepository } from "../../../database/mongodb/repository/userRepository";
import { EmailService } from "../../../services/emailService";
import { JWTService } from "../../../services/jwtService";
import { OTPService } from "../../../services/otpService";
import { RequestValidator } from "../../../services/requestValidator";
import { SecretHasher } from "../../../services/secrectHasherService";


const userRepositories = new UserRepository(userModel);
const addressRepository = new AddressRepository(addressModel);
const emailService = new EmailService();
const otpService = new OTPService();
const secretHashService = new SecretHasher();
const jwtService = new JWTService();
const requestValidator = new RequestValidator();
const userUsecase = new UserUseCase(
    userRepositories,
    addressRepository,
    emailService,
    otpService,
    secretHashService,
    jwtService,
    requestValidator
);
export const UserAdapters = new UserAdapter(userUsecase);
