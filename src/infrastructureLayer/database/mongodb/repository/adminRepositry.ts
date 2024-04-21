import { Document } from "mongoose";
import { IAdmin } from "../../../../domainLayer/admin";
import { IAdminRepository } from "../../../../usecaseLayer/interface/repository/IAdminRepository";
import { adminModel } from "../models/adminModel";
import { findAdmin } from "./admin/findAdmin";

export class AdminRepository implements IAdminRepository{

    private readonly adminModels:typeof adminModel;
    constructor( adminModels:typeof adminModel ){
        this.adminModels = adminModels;
    }

    async findAdmin(email: string): Promise<IAdmin & Document | null> {
        return findAdmin( email, this.adminModels )
    }
   
    
}