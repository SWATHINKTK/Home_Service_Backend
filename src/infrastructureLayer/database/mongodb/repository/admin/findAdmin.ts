import { Document } from "mongoose";
import { IAdmin } from "../../../../../domainLayer/admin";
import { DBConnectionError } from "../../../../../usecaseLayer/handler/databaseConnectionError";
import { adminModel } from "../../models/adminModel";

export const findAdmin = async(email:string, adminModels:typeof adminModel ):Promise<IAdmin & Document | null> => {
    try {
        return await adminModel.findOne({email})
    } catch (error) {
        console.log("Admin DB",error)
        throw new DBConnectionError();
    }
}