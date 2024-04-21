import { Document } from "mongoose";
import { IUser } from "../../../../domainLayer/user";
import { IUserRepository } from "../../../../usecaseLayer/interface/repository/IUserRepository";
import { PublicUserInfo } from "../../../../usecaseLayer/interface/services/IResponse";
import { userModel } from "../models/userModel";
import { createUser } from "./user/createUser";
import { findUser } from "./user/findUser";
import { findAllUsers } from "./user/findAllUser";


/**
 * UserRepository class implements the IUserRepository interface
 * to interact with user data in the database.
 */
export class UserRepository implements IUserRepository{

    /**
     * Constructs a new UserRepository instance.
     * @param {typeof userModel} userModelInstance An instance of the userModel representing the database model for users.
     */
    private readonly userModel:typeof userModel;
    constructor(userModelInstance: typeof userModel){
        this.userModel = userModelInstance
    }
    


     /**
     * Create a new user in the database.
     * @param {IUser} newUser An object containing the data of the user to be created.
     * @returns {Promise<IUser>} A Promise that resolves with the newly created user.
     */
    async createUser(newUser: IUser): Promise<PublicUserInfo> {
        return createUser(newUser,this.userModel)
    }



     /**
     * finding a user data.
     * @param {string} email email is used to fetch data.
     * @returns {Promise<IUser & Document | null>} A Promise that resolves with the return all users.
     */
    async findUser(email: string): Promise<IUser & Document | null> {
        return findUser(email)
    }
    

    /**
     * Finding All User Data.
     * 
     * @returns {Promise<IUser & Document | null>} A Promise that resolves with the return all users.
     */
    async findAllUsers(): Promise<any[] | null> {
        return findAllUsers(this.userModel);
    }
    
    
}