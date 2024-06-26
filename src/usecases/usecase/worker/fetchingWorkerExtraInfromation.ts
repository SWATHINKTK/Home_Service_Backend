
import { IServerResponse } from "../../../infrastructure/types/IResponse";
import { BadRequestError } from "../../handler/badRequestError";
import { IWorkerRepository } from "../../interface/repository/IWorkerRepository";

export const findWorkerExtraInformation = async(workerId:string, workerRepository:IWorkerRepository):Promise<IServerResponse> => {
    try {
        if(!workerId){
            throw new BadRequestError('Invalid Data.');
        }

        const workerExtraInfo = await workerRepository.findWorkerExtraInformation(workerId);
        return{
            statusCode:200,
            success:true,
            message:'Worker Extra Information Fetching Successful.',
            data:workerExtraInfo
        }
    } catch (error) {
        throw error
    }
}