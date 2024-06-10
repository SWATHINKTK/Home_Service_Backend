import { BadRequestError } from "../../../../../usecases/handler/badRequestError";
import { IMessageDocument, messageModel } from "../../models/messageModel";

export const findMessages = async(conversationId:string, messageModelInstance:typeof messageModel):Promise<IMessageDocument[]> => {
    try {
        const messages = await messageModelInstance.find({conversationId:conversationId});
        return messages;
    } catch (error) {
        throw new BadRequestError('Invalid Request.')
    }
}