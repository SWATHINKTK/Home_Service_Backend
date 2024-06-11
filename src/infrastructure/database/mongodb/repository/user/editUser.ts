import { IUser } from "../../../../../domain/user";
import { DBConnectionError } from "../../../../../usecases/handler/databaseConnectionError";
import { userModel } from "../../models/userModel";

export interface IUpdateUserData{
    firstname:string,
    lastname:string,
    phoneNumber:string,
    district:string
}

export const updateUserData = async(userEmail:string, updateUserData:IUpdateUserData, userModelInstance: typeof userModel) => {
    try {
        const editedUser = await userModelInstance.updateOne({ email: userEmail }, { $set: updateUserData },{upsert:true});
        console.log(editedUser)
        return !!editedUser.modifiedCount
    } catch (error) {
        console.log(error)
        throw new DBConnectionError();
    }
}