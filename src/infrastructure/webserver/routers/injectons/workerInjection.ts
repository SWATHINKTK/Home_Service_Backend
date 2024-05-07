import { WorkerAdapter } from "../../../../controllers/workerAdapter";
import { WorkerUseCase } from "../../../../usecases/usecase/workerUseCase";
import { workerExtraInfoModel } from "../../../database/mongodb/models/workerExtraInfoModel";
import { workerModel } from "../../../database/mongodb/models/workerModel";
import { WorkerRepository } from "../../../database/mongodb/repository/workerRepository";
import { JWTService } from "../../../services/jwtService";
import { SecretHasher } from "../../../services/secrectHasherService";

const workerRepository = new WorkerRepository(workerModel, workerExtraInfoModel);
const secretHasher = new SecretHasher();
const jwtService = new JWTService();
const workerUseCase = new WorkerUseCase(workerRepository, secretHasher, jwtService);

export const workerAdapter = new WorkerAdapter(workerUseCase);