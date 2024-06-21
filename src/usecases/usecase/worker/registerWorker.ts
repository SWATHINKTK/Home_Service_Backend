import { IWorker } from "../../../domain/worker";
import { IWorkerExtraInfo } from "../../../infrastructure/types/worker";
import { BadRequestError } from "../../handler/badRequestError";
import { IWorkerRepository } from "../../interface/repository/IWorkerRepository";
import { IServerResponse } from "../../../infrastructure/types/IResponse";
import { ISecretHasher } from "../../interface/services/ISecretHasher";

export const registerWorker = async (
    workerData: IWorker,
    workerImages: { [fieldname: string]: Express.Multer.File[] },
    workerRepository: IWorkerRepository,
    secretHasher: ISecretHasher
): Promise<IServerResponse> => {
    try {
        // ** Ensuring the Worker Data.
        if (!workerData || !workerImages) {
            throw new BadRequestError("Worker Data Not Found");
        }

        // ** Checking This Worker is Already Exist or Not
        const query = {phoneNumber:workerData.phoneNumber}
        const existingWorker = await workerRepository.findWorker(query);
        if(existingWorker){
            throw new BadRequestError("Worker is Already Exist");
        }

        // ** Hashing the Password
        workerData.password = await secretHasher.hashSecret(workerData.password)

        // ** Creating Worker Extra Info Sore Data.
        const workerExtraInfo: IWorkerExtraInfo = {
            qualification: workerData.qualification,
            experience: workerData.experience,
            certificate: (workerImages["certificate"][0] as any).location,
            idProof: (workerImages["idProof"][0] as any).location,
        };

        // ** Calling The Worker Creation Function.
        const workerCreation = await workerRepository.registerWorker(workerData, workerExtraInfo);
        if (!workerCreation) {
            throw new BadRequestError("Registration Failed,Try again.");
        }

        return {
            statusCode: 200,
            success: true,
            message: "Worker Registration Successful.",
        };
    } catch (error) {
        throw error;
    }
};
