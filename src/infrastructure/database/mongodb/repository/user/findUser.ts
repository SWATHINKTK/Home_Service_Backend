import { Document } from "mongoose";
import { IUser } from "../../../../../domain/user";
import { userModel } from "../../models/userModel"

export const findUser = async (
  query:Record<string, any>,
  userModelInstance: typeof userModel
): Promise<(IUser & Document) | null> => {
  try {
    return await userModelInstance.findOne(query);
  } catch (error) {
    console.log("Error for finding user", error);
    return null;
  }
};