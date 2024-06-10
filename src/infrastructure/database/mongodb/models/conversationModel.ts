import mongoose, { Document, Model, Schema, model } from "mongoose";
import { IConversation } from "../../../../domain/conversation";

export interface IConversationDocument extends IConversation, Document {}

const conversationSchema = new Schema({
    members:{
        type:[String],
        required:true
    }
},{timestamps:true});

export const conversationModel:Model<IConversationDocument> = model<IConversationDocument>('conversation',conversationSchema);