import { Document } from "mongoose";
import { IUser } from "../../../../../domainLayer/user";
import { userModel } from "../../models/userModel";
import { DBConnectionError } from "../../../../../usecaseLayer/handler/databaseConnectionError";
import { BadRequestError } from "../../../../../usecaseLayer/handler/badRequestError";

export const updateUserBlockStatus = async (userId: string, userModels: typeof userModel): Promise<string> => {
    try {
        const user: IUser & Document | null = await userModels.findOne({ _id: userId });

        if (user) {
            user._isBlocked = !user._isBlocked;
            await user.save();
            return "User block status updated successfully.";
        } else {
            throw new BadRequestError("User not found.");
        }
    } catch (error) {
        throw error;
    }
}
