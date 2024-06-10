import { BadRequestError } from "../../../../../usecases/handler/badRequestError";
import { IConversationDocument, conversationModel } from "../../models/conversationModel";

export const createConversation = async(senderId:string, receiverId:string, conversationModelInstance:typeof conversationModel):Promise<IConversationDocument> => {
    try {
        const conversation = await conversationModelInstance.create({members:[senderId, receiverId]});
        await conversation.save();
        return conversation;
    } catch (error) {
        console.log(error)
        throw new BadRequestError('Invalid Request')
    }
}