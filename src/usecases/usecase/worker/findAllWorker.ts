import { IWorkerRepository } from "../../interface/repository/IWorkerRepository";
import { IServerResponse } from "../../interface/services/IResponse";

export const retrieveAllWorker = async(workerRepository:IWorkerRepository):Promise<IServerResponse> => {
      try {
          const workers = await workerRepository.retrieveAllWorkers();
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