import { Document } from "mongoose";
import { IAdmin } from "../../../domainLayer/admin";

export interface IAdminRepository{
    findAdmin(email:string):Promise<IAdmin & Document | null>;
}