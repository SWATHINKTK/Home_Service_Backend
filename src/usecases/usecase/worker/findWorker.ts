import { BadRequestError } from "../../handler/badRequestError";
import { IUserRepository } from "../../interface/repository/IUserRepository";
import { IWorkerRepository } from "../../interface/repository/IWorkerRepository";
import { IServerResponse } from "../../../infrastructure/types/IResponse";

export const getWorker = async (userPhoneNumber:string, workerRepository: IWorkerRepository):Promise<IServerResponse> => {
    try {
        const query = {phoneNumber:userPhoneNumber}
        const workerData = await workerRepository.findWorker(query);
        if(!workerData){
            throw new BadRequestError("Worker Is Does not Exist");
        }
        return {
            statusCode:200,
            success:true,
            message: "Worker profile retrieved successfully.",
            data: workerData
        }
    } catch (error) {
        throw error
    }
}