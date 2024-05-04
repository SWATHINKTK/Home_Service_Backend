import { Document } from "mongoose";
import { IAdmin } from "../../../../../domain/admin";
import { DBConnectionError } from "../../../../../usecases/handler/databaseConnectionError";
import { adminModel } from "../../models/adminModel";

export const findAdmin = async ( email: string,adminModelInstance: typeof adminModel): Promise<(IAdmin & Document) | null> => {
  try {
    return await adminModelInstance.findOne({ email });
  } catch (error) {
    console.log("Admin DB", error);
    throw new DBConnectionError();
  }
};