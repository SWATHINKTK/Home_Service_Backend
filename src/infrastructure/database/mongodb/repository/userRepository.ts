import { Document } from "mongoose";
import { IUser } from "../../../../domain/user";
import { IUserRepository } from "../../../../usecases/interface/repository/IUserRepository";
import { PublicUserInfo } from "../../../types/IResponse";
import { userModel } from "../models/userModel";
import { createUser } from "./user/createUser";
import { findUser } from "./user/findUser";
import { findAllUsers } from "./user/findAllUser";
import { updateUserBlockStatus } from "./user/changeUserBlockStatus";
import { IUpdateUserData, updateUserData } from "./user/editUser";


/**
 * UserRepository class implements the IUserRepository interface
 * to interact with user data in the database.
 */
export class UserRepository implements IUserRepository {

    /**
     * Constructs a new UserRepository instance.
     * @param {typeof userModel} userModelInstance An instance of the userModel representing the database model for users.
     */
    private readonly _userModelInstance: typeof userModel;
    constructor(_userModelInstance: typeof userModel) {
        this._userModelInstance = _userModelInstance;
    }
   


    /**
     * Create a new user in the database.
     * @param {IUser} newUser An object containing the data of the user to be created.
     * @returns {Promise<IUser>} A Promise that resolves with the newly created user.
     */
    async createUser(newUser: IUser): Promise<PublicUserInfo> {
        return createUser(newUser, this._userModelInstance);
    }

    
    /**
     * finding a user data.
     * @param {string} email email is used to fetch data.
     * @returns {Promise<IUser & Document | null>} A Promise that resolves with the return all users.
     */
    async findUser(query:Record<string, any>): Promise<(IUser & Document) | null> {
        return findUser(query, this._userModelInstance);
    }


    /**
     * Finding All User Data.
     *
     * @returns {Promise<IUser & Document | null>} A Promise that resolves with the return all users.
     */
    async findAllUsers(): Promise<any[] | null> {
        return findAllUsers(this._userModelInstance);
    }


    /**
     * Finding That User and Change Status of Block.
     * @param {userId} userId UserId is used to update the status.
     * @returns {Promise<IUser & Document | null>} A Promise that resolves with the return all users.
     */
    updateUserBlockStatus(userId: string): Promise<string> {
        return updateUserBlockStatus(userId, this._userModelInstance);
    }

    /**
     * Updating the UserProfile Data.
     * @param {userEmail} userEmail is used to Fetch That User.
     * @param {updatedData} updatedData is used to change data on That User.
     * @returns {Promise<boolean>} A Promise that resolves with the return all users.
     */
    updateUserData(userEmail: string, updatedData: IUpdateUserData): Promise<boolean> {
        return updateUserData(userEmail, updatedData, this._userModelInstance)
    }
}