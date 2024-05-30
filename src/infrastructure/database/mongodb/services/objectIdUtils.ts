import mongoose from "mongoose";

export class ObjectIdUtils{
    static toObjectId(id:string){
       return mongoose.Types.ObjectId.createFromHexString(id); 
    }
}