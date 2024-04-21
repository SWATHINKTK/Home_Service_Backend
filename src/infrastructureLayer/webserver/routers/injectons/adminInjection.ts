import { AdminAdapter } from "../../../../controllerLayer/adminAdapter";
import { AdminUseCase } from "../../../../usecaseLayer/usecase/adminUsecase";
import { adminModel } from "../../../database/mongodb/models/adminModel";
import { AdminRepository } from "../../../database/mongodb/repository/adminRepositry";
import { JWTService } from "../../../services/jwtService";
import { SecretHasher } from "../../../services/secrectHasherService";

const adminRepository = new AdminRepository(adminModel);
const jwtService = new JWTService();
const secretHashService = new SecretHasher();
const adminUsecase =  new AdminUseCase(adminRepository, secretHashService, jwtService);

export const adminAdapter = new AdminAdapter(adminUsecase);