import { IMessage } from "../../../../domain/message";
import { IMessageRepository } from "../../../../usecases/interface/repository/IMessageRepository";
import { IMessageDocument, messageModel } from "../models/messageModel";
import { createMessage } from "./chat/createMessage";
import { findMessages } from "./chat/findMessages";

export class MessageRepository implements IMessageRepository{
    
    private readonly _messageModelInstance:typeof messageModel
    constructor(messageModelInstance:typeof messageModel){
        this._messageModelInstance = messageModelInstance;
    }

    async createMessage(messageData: IMessage): Promise<IMessageDocument> {
        return createMessage(messageData, this._messageModelInstance)
    }

    findMessages(conversationId: string): Promise<IMessageDocument[]> {
        return findMessages(conversationId, this._messageModelInstance);
    }
}