import { IUser } from "../../../../../domain/user";
import { DBConnectionError } from "../../../../../usecases/handler/databaseConnectionError";
import { userModel } from "../../models/userModel";
import { workerModel } from "../../models/workerModel";

export interface IUpdateWorkerData{
    username:string,
    email:string,
    district:string,
    location:string
}

export const updateWorkerData = async(workerPhoneNumber:string, updateWorkerData:IUpdateWorkerData, workerModelInstance: typeof workerModel) => {
    try {
        console.log(updateWorkerData,workerPhoneNumber)
        const editedUser = await workerModelInstance.updateOne({ phoneNumber: workerPhoneNumber }, { $set: updateWorkerData },{upsert:true});
        console.log(editedUser)
        return !!editedUser.modifiedCount
    } catch (error) {
        console.log(error)
        throw new DBConnectionError();
    }
}