import mongoose, { Model, Schema, model } from "mongoose"
import { IWorkerExtraInfo } from "../../../types/worker";


const workerExtraInfoSchema = new Schema({
    workerId:{
        type:mongoose.Schema.ObjectId,
        parent:'worker'
    },
    qualification:{
        type:String,
        require:true
    },
    experience:{
        type:Number,
        require:true
    },
    certificate:{
        type:String,
        require:true
    },
    idProof:{
        type:String,
        require:true
    }
},{timestamps:true});

export const workerExtraInfoModel: Model<IWorkerExtraInfo> = model<IWorkerExtraInfo >('workerExtraInfo',workerExtraInfoSchema) 