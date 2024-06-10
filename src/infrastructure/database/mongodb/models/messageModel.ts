import mongoose, { Document, Model, Schema, model } from "mongoose";
import { IMessage } from "../../../../domain/message";

export interface IMessageDocument extends IMessage, Document{}

const messageSchema = new Schema({
    conversationId:{
        type:mongoose.Types.ObjectId,
        ref:'conversation',
        required:true
    },
    senderId:{
        type:mongoose.Types.ObjectId,
        required:true
    },
    receiverId:{
        type:mongoose.Types.ObjectId,
        required:true
    },
    text:{
        type:String,
        required:true
    },
    status:{
        type:Boolean,
        default:false
    }
},{timestamps:true});

export const messageModel:Model<IMessageDocument> = model<IMessageDocument>('message',messageSchema);