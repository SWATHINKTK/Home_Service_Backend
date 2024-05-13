import { BadRequestError } from "../../handler/badRequestError";
import { IWorkerRepository } from "../../interface/repository/IWorkerRepository";
import { IServerResponse } from "../../../infrastructure/types/IResponse";

export const verifyWorker = async (workerId: string, workerRepository: IWorkerRepository): Promise<IServerResponse> => {
   try {
      const verify = await workerRepository.verifyWorker(workerId);
      if(verify)
         return {
            statusCode: 200,
            success: true,
            message: "Worker is Verified."
         }
      throw new BadRequestError('Worker Verification Failed.Try Again.');
   } catch (error) {
      throw error;
   }
}