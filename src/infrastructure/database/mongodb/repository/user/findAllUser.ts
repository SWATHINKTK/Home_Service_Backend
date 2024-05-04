import { IUser } from "../../../../../domain/user";
import { DBConnectionError } from "../../../../../usecases/handler/databaseConnectionError"
import { userModel } from "../../models/userModel";

export const findAllUsers = async(userModelInstance:typeof userModel):Promise<any[] | null> =>{
    try {
        return await userModelInstance.find({});
    } catch (error) {
        throw new DBConnectionError();
    }
}