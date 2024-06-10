import { IServerResponse } from "../../../infrastructure/types/IResponse";
import { BadRequestError } from "../../handler/badRequestError";
import { IConversationRepository } from "../../interface/repository/IConversationRepository";
import { IRequestValidator } from "../../interface/services/IRequestValidator";

export const createConversation = async (
    senderId: string,
    receiverId: string,
    conversationRepository: IConversationRepository,
    requestValidator:IRequestValidator
):Promise<IServerResponse> => {
    try {
        const requestValidation = requestValidator.validateRequiredFields({senderId, receiverId},['senderId', 'receiverId']);
        if(!requestValidation.success){
            console.log(requestValidation)
            throw new BadRequestError(requestValidation.message)
        }
        let conversation;
        conversation = await conversationRepository.findConversation(senderId, receiverId);
        if(!conversation){
            conversation = await conversationRepository.createConversation(senderId, receiverId);
        }
        return {
            success:true,
            statusCode:200,
            message:'Conversation Generated',
            data:conversation
        }
    } catch (error) {
        throw error
    }
};
