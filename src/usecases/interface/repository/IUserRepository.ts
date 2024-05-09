import { Document } from "mongoose";
import { IUser } from "../../../domain/user";
import { PublicUserInfo } from "../services/IResponse";
import { IUpdateUserData } from "../../../infrastructure/database/mongodb/repository/user/editUser";



export interface IUserRepository{
    createUser(newUser:IUser):Promise<PublicUserInfo>;
    findUser(email:string):Promise<IUser & Document | null>;
    findAllUsers(): Promise<any[] | null>;
    updateUserBlockStatus(userId:string):Promise<string>;
    updateUserData(userEmail:string, updatedData:IUpdateUserData):Promise<boolean>; 
}