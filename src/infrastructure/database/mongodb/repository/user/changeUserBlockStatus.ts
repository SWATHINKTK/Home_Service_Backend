import { Document } from "mongoose";
import { IUser } from "../../../../../domain/user";
import { userModel } from "../../models/userModel";
import { BadRequestError } from "../../../../../usecases/handler/badRequestError";

export const updateUserBlockStatus = async (userId: string, userModelInstance: typeof userModel): Promise<string> => {
    try {
        const user: IUser & Document | null = await userModelInstance.findOne({ _id: userId });

        if (user) {
            user._isBlocked = !user._isBlocked;
            await user.save();
            return "User block status updated successfully.";
        } else {
            throw new BadRequestError("User not found.");
        }
    } catch (error) {
        throw new BadRequestError('User Not Found');
    }
}
