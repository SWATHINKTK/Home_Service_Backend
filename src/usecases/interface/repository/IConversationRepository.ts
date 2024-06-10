import { IConversationDocument, conversationModel } from "../../../infrastructure/database/mongodb/models/conversationModel";

export interface IConversationRepository{
    createConversation(senderId:string, receiverId:string):Promise<IConversationDocument>;
    findConversation(senderId:string, receiverId:string):Promise<IConversationDocument | null>;
}