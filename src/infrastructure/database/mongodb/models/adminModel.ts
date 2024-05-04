import mongoose, { Document, Model, Schema, model } from "mongoose";
import { IAdmin } from "../../../../domain/admin";

const adminSchema = new Schema({
    name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    }
})

export const adminModel:Model<IAdmin & Document> = model<IAdmin & Document>('admin',adminSchema);