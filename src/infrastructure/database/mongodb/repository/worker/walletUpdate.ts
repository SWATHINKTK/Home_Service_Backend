import { DBConnectionError } from "../../../../../usecases/handler/databaseConnectionError";
import { workerModel } from "../../models/workerModel";

export const walletUpdate = async(workerId:string, amount:number, workerModelInstance:typeof workerModel)=>{
    try {
        const wallet = await workerModelInstance.updateOne({ _id:workerId }, { $inc:{walletAmount:amount} },{upsert:true});
        console.log(wallet)
        return !!wallet.modifiedCount
    } catch (error) {
        console.log(error)
        throw new DBConnectionError();
    }
}