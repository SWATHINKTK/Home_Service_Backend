import { Document } from "mongoose";
import { IUser } from "../../../../../domain/user";
import { userModel } from "../../models/userModel"

export const findUser = async (
  email: string,
  userModelInstance: typeof userModel
): Promise<(IUser & Document) | null> => {
  try {
    return await userModelInstance.findOne({ email });
  } catch (error) {
    console.log("Error for finding user", error);
    return null;
  }
};