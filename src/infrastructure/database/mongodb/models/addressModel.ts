import mongoose, { Document, Model, model, Schema } from "mongoose";
import { IAddress } from "../../../../domain/address";

const addressSchema = new Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'users'
    },
    buildingName: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    location: {
        type: {
            type: String,
            enum: ["Point"],
            default: "Point",
            required: true
        },
        coordinates: {
            type: [Number], // [longitude, latitude]
            required: true
        }
    },
    locationDetails: {
        type: String,
        required: true
    }
});

export const addressModel: Model<IAddress & Document> = model<IAddress & Document>('address', addressSchema);