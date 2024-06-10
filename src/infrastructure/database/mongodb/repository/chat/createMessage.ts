import { IMessage } from "../../../../../domain/message"
import { BadRequestError } from "../../../../../usecases/handler/badRequestError";
import { IMessageDocument, messageModel } from "../../models/messageModel"

export const createMessage = async(messageData:IMessage, messageModelInstance:typeof messageModel):Promise<IMessageDocument> => {
    try {
        const newMessage = await messageModelInstance.create(messageData);
        return newMessage;
    } catch (error) {
        throw new BadRequestError('Invalid Data.')
    }
}