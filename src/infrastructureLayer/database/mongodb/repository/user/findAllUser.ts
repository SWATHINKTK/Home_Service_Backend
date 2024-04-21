import { IUser } from "../../../../../domainLayer/user";
import { DBConnectionError } from "../../../../../usecaseLayer/handler/databaseConnectionError"
import { userModel } from "../../models/userModel";

export const findAllUsers = async(userModels:typeof userModel):Promise<any[] | null> =>{
    try {
        return await userModel.find({});
    } catch (error) {
        throw new DBConnectionError();
    }
}