import { IServerResponse } from "../../../infrastructure/types/IResponse";
import { BadRequestError } from "../../handler/badRequestError";
import { IMessageRepository } from "../../interface/repository/IMessageRepository";
import { IRequestValidator } from "../../interface/services/IRequestValidator";

export const viewMessage = async (
    conversationId: string,
    messageRepository: IMessageRepository,
    requestValidator: IRequestValidator
):Promise<IServerResponse> => {
    try {
        const requestValidation = requestValidator.validateRequiredFields(
            { conversationId },
            ["conversationId"]
        );
        if (!requestValidation.success) {
            console.log(requestValidation);
            throw new BadRequestError(requestValidation.message);
        }

        const messages = await messageRepository.findMessages(conversationId);
        return {
            statusCode:200,
            success:true,
            message:'Retrieve all messages.',
            data:messages
        };
    } catch (error) {
        throw error;
    }
};
