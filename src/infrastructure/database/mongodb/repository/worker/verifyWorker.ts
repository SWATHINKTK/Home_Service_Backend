import { BadRequestError } from "../../../../../usecases/handler/badRequestError";
import { workerModel } from "../../models/workerModel"

export const verifyWorker = async(workerId:string, workerModelInstance:typeof workerModel) => {
    try {
        const updateWorker = await workerModelInstance.updateOne({_id:workerId},{$set:{_isVerified:true}});
        if (!updateWorker.matchedCount){
           throw new BadRequestError('Invalid WorkerId.Please Check it.')
        }
        return true
    } catch (error) {
        throw error
    }
}