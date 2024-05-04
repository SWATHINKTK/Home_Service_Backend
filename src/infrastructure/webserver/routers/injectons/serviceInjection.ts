import { ServiceAdapter } from "../../../../controllers/serviceAdapter";
import { ServiceUseCase } from "../../../../usecases/usecase/serviceUseCase";
import { serviceModel } from "../../../database/mongodb/models/serviceModel";
import { ServiceRepository } from "../../../database/mongodb/repository/serviceRepostiry";

const serviceRepository = new ServiceRepository(serviceModel);
const serviceUseCase = new ServiceUseCase(serviceRepository);

export const serviceAdapter = new ServiceAdapter(serviceUseCase);
