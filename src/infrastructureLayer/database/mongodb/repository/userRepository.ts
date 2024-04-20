import { IUser } from "../../../../domainLayer/user";
import { IUserRepository } from "../../../../usecaseLayer/interface/repository/IUserRepository";
import { PublicUserInfo } from "../../../../usecaseLayer/interface/services/IResponse";
import { userModel } from "../models/userModel";
import { createUser } from "./user/createUser";


/**
 * UserRepository class implements the IUserRepository interface
 * to interact with user data in the database.
 */
export class userRepository implements IUserRepository{

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
    

    findUser(email: string): Promise<IUser | undefined> {
        throw new Error("Method not implemented.");
    }
}