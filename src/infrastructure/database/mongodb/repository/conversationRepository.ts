import { IConversationRepository } from "../../../../usecases/interface/repository/IConversationRepository";
import { IConversationDocument, conversationModel } from "../models/conversationModel";
import { createConversation } from "./chat/createConversation";
import { findConversation } from "./chat/findConversation";

export class ConversationRepository implements IConversationRepository{
    private readonly _conversationModelInstance:typeof conversationModel
    constructor(conversationModelInstance:typeof conversationModel){
        this._conversationModelInstance = conversationModelInstance;
    }

    createConversation(senderId: string, receiverId: string): Promise<IConversationDocument> {
        return createConversation(senderId, receiverId, this._conversationModelInstance)
    }

    findConversation(senderId:string, receiverId:string): Promise<IConversationDocument | null>{
        return findConversation(senderId, receiverId, this._conversationModelInstance)
    }
}