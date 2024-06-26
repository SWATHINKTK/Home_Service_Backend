import { InternalServerError } from "../../../../../usecases/handler/internalServerError";
import { IWorkerExtraInfo } from "../../../../types/worker";
import { workerExtraInfoModel } from "../../models/workerExtraInfoModel";

export const findWorkerExtraInformation = async(workerId:string, workerExtraModelInstance:typeof workerExtraInfoModel):Promise<IWorkerExtraInfo | null> => {
    try {
        const extraInfo = await workerExtraInfoModel.findOne({workerId});
        return extraInfo;
    } catch (error) {
        throw new InternalServerError('Invalid Data');
        
    }
}