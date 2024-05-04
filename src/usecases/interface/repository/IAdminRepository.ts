import { Document } from "mongoose";
import { IAdmin } from "../../../domain/admin";

export interface IAdminRepository{
    findAdmin(email:string):Promise<IAdmin & Document | null>;
}