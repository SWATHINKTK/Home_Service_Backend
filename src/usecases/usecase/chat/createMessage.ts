import { IServerResponse } from "../../../infrastructure/types/IResponse";
import { BadRequestError } from "../../handler/badRequestError";
import { IMessageRepository } from "../../interface/repository/IMessageRepository";
import { IRequestValidator } from "../../interface/services/IRequestValidator";

export const createMessage = async (
    text: string,
    senderId: string,
    receiverId: string,
    conversationId: string,
    messageRepository: IMessageRepository,
    requestValidator: IRequestValidator
):Promise<IServerResponse> => {
    try {
        const requestValidation = requestValidator.validateRequiredFields({text, senderId, receiverId, conversationId},['text', 'senderId', 'receiverId', 'conversationId']);
        if(!requestValidation.success){
            console.log(requestValidation)
            throw new BadRequestError(requestValidation.message)
        }

        const message = await messageRepository.createMessage({text, senderId, receiverId, conversationId});
        return {
            statusCode:200,
            success:true,
            message:'Message Created.',
            data:message
        }

    } catch (error) {
        throw error;
    }
};
