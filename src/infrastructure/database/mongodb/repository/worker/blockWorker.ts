import { BadRequestError } from "../../../../../usecases/handler/badRequestError";
import { workerModel } from "../../models/workerModel"

export const blockWorker = async(workerId:string, workerModelInstance:typeof workerModel) => {
    try {
        const worker = await workerModelInstance.findOne({_id:workerId});
        if(!worker){
            throw new BadRequestError('Invalid WorkerId.Please Check it.')
        }
        const updateWorker = await workerModelInstance.updateOne({_id:workerId},{$set:{_isBlocked:worker._isBlocked}});
        return true
    } catch (error) {
        throw error
    }
}