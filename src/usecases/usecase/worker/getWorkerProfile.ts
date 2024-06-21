import { BadRequestError } from "../../handler/badRequestError";
import { IUserRepository } from "../../interface/repository/IUserRepository";
import { IWorkerRepository } from "../../interface/repository/IWorkerRepository";
import { IServerResponse } from "../../../infrastructure/types/IResponse";

export const getWorkerProfile = async (workerId:string, workerRepository: IWorkerRepository):Promise<IServerResponse> => {
    try {
        const workerData = await workerRepository.retrieveWorkerAllDetails(workerId);
        if(!workerData){
            throw new BadRequestError("Worker Is Does not Exist");
        }
        return {
            statusCode:200,
            success:true,
            message: "Worker profile retrieved successfully.",
            data: workerData[0]
        }
    } catch (error) {
        throw error
    }
}