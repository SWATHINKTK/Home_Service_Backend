import mongoose, { Document, Model, Schema, model } from "mongoose";
import { IUser } from "../../../../domain/user";



const userSchema: Schema = new Schema<IUser & Document>(
    {
        firstname: {
            type: String,
            require: true,
        },
        lastname: {
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
        district: {
            type: String,
            require: true,
        },
        password: {
            type: String,
            require: true,
        },
        _isBlocked: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

export const userModel: Model<IUser & Document> = model<IUser & Document>(
    "users",
    userSchema
);
