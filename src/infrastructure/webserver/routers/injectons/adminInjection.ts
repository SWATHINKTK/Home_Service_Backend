import { AdminAdapter } from "../../../../controllers/adminAdapter";
import { AdminUseCase } from "../../../../usecases/usecase/adminUsecase";
import { adminModel } from "../../../database/mongodb/models/adminModel";
import { userModel } from "../../../database/mongodb/models/userModel";
import { AdminRepository } from "../../../database/mongodb/repository/adminRepository";
import { UserRepository } from "../../../database/mongodb/repository/userRepository";
import { JWTService } from "../../../services/jwtService";
import { SecretHasher } from "../../../services/secrectHasherService";

const adminRepository = new AdminRepository(adminModel);
const userRepository = new UserRepository(userModel);
const jwtService = new JWTService();
const secretHashService = new SecretHasher();
const adminUsecase =  new AdminUseCase( adminRepository, secretHashService, jwtService, userRepository);

export const adminAdapter = new AdminAdapter(adminUsecase);