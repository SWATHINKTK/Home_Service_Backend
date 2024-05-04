import { Document } from "mongoose";
import { IAdmin } from "../../../../domain/admin";
import { IAdminRepository } from "../../../../usecases/interface/repository/IAdminRepository";
import { adminModel } from "../models/adminModel";
import { findAdmin } from "./admin/findAdmin";

export class AdminRepository implements IAdminRepository{

    private readonly _adminModelInstance:typeof adminModel;
    constructor( _adminModelInstance:typeof adminModel ){
        this._adminModelInstance = _adminModelInstance;
    }

    async findAdmin(email: string): Promise<IAdmin & Document | null> {
        return findAdmin( email, this._adminModelInstance )
    }
   
    
}