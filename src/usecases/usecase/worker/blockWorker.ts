import { BadRequestError } from "../../handler/badRequestError";
import { IWorkerRepository } from "../../interface/repository/IWorkerRepository";
import { IServerResponse } from "../../interface/services/IResponse";

export const blockWorker = async (workerId: string, workerRepository: IWorkerRepository): Promise<IServerResponse> => {
    try {
        const block = await workerRepository.verifyWorker(workerId);
        if(block)
            return {
                statusCode: 200,
                success: true,
                message: "Worker Status is Updated."
            }
        throw new BadRequestError("Worker Blocking Failed.Try Again...")
    } catch (error) {
        throw error;
    }
}