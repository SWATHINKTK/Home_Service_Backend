import { IUser } from "../../../domainLayer/user"
import { PublicUserInfo } from "../services/IResponse";

export interface IUserRepository{
    createUser(newUser:IUser):Promise<PublicUserInfo>;
    findUser(email:string):Promise<IUser | undefined>;
}