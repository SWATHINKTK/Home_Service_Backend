import { IWorkerRepository } from "../../interface/repository/IWorkerRepository";
import { IServerResponse } from "../../../infrastructure/types/IResponse";

export const retrieveWorkerAllDetails = async(status:boolean, workerRepository:IWorkerRepository):Promise<IServerResponse> => {
      try {
          const workers = await workerRepository.findAllWorker({_isVerified:status});
          console.log("!!!!!!!!!!",workers)
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