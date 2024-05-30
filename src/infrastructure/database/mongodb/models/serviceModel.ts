import mongoose, { Model, Schema, model } from "mongoose";
import { IService } from "../../../../domain/service";

const serviceSchema = new Schema(
    {
        serviceName: {
            type: String,
            require: true,
        },
        minimumAmount: {
            type: Number,
            require: true,
        },
        hourlyAmount: {
            type: Number,
            require: true,
        },
        serviceDescription: {
            type: String,
            require: true,
        },
        icon: {
            type: String,
            require: true,
        },
        image: {
            type: String,
            require: true,
        },
        _isBlocked:{
            type:Boolean,
            default:false
        }
    },
    { timestamps: true }
);



export const serviceModel: Model<IService & Document> = model<IService & Document>('services', serviceSchema)