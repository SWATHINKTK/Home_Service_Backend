import { IWorkerRepository } from "../../interface/repository/IWorkerRepository";
import { IServerResponse } from "../../interface/services/IResponse";

export const verifyWorker = async(workerId:string, workerRepository:IWorkerRepository):Promise<IServerResponse> => {
     try {
        const verify = await workerRepository.verifyWorker(workerId);
        return {
statusCode:200,
success:true,
message:"Worker is Verified."
        }
     } catch (error) {
        throw error;
     }
}