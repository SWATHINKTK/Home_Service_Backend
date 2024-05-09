import mongoose, { Document, Model, Schema, model } from "mongoose";
import { IWorker } from "../../../../domain/worker";

const workerSchema = new Schema(
    {
        username: {
            type: String,
            require: true,
        },
        email: {
            type: String,
            require: true,
        },
        phoneNumber: {
            type: String,
            require: true,
        },
        service: {
            type: mongoose.Schema.ObjectId,
            require: true,
        },
        district: {
            type: String,
            require: true,
        },
        location: {
            type: String,
            require: true,
        },
        profile: {
            type:String,
            require:true  
        },
        password: {
            type: String,
            require: true,
        },
        _isBlocked: {
            type: Boolean,
            default: false,
        },
        _isVerified: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
);

export const workerModel: Model<IWorker & Document> = model<IWorker & Document>(
    "worker",
    workerSchema
);
