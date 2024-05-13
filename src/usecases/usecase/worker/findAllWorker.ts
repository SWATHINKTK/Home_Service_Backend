import { IWorkerRepository } from "../../interface/repository/IWorkerRepository";
import { IServerResponse } from "../../../infrastructure/types/IResponse";

export const retrieveAllWorker = async(status:boolean, workerRepository:IWorkerRepository):Promise<IServerResponse> => {
      try {
          const workers = await workerRepository.retrieveAllWorkers(status);
          return{
            statusCode:200,
            success:true,
            message:'Successfully Retrieve All Data.',
            data:workers
          }
      } catch (error) {
        throw error;
      }
}