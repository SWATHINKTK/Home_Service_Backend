import { Document } from "mongoose";
import { IUser } from "../../../domain/user";
import { PublicUserInfo } from "../services/IResponse";



export interface IUserRepository{
    createUser(newUser:IUser):Promise<PublicUserInfo>;
    findUser(email:string):Promise<IUser & Document | null>;
    findAllUsers(): Promise<any[] | null>;
    updateUserBlockStatus(userId:string):Promise<string>;
}