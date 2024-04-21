import { Document } from "mongoose";
import { IUser } from "../../../../../domainLayer/user";
import { userModel } from "../../models/userModel"

export const findUser = async(email:string):Promise<IUser & Document | null> =>{
    try {
        return await userModel.findOne({email});
    } catch (error) {
        console.log("Error for finding user",error);
        return null;
    }
}