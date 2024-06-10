import { IMessage } from "../../../domain/message";
import { IMessageDocument } from "../../../infrastructure/database/mongodb/models/messageModel";

export interface IMessageRepository{
    createMessage(messageData:IMessage):Promise<IMessageDocument>;
    findMessages(conversationId:string):Promise<IMessageDocument[]>;
}