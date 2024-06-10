import { IConversationDocument, conversationModel } from "../../models/conversationModel";
import { BadRequestError } from "../../../../../usecases/handler/badRequestError";

export const findConversation = async (
    senderId: string,
    receiverId: string,
    conversationModelInstance: typeof conversationModel
): Promise<IConversationDocument | null> => {
    try {
        const conversation = await conversationModelInstance.findOne({
            members: { $all: [senderId, receiverId] },
        });
        return conversation;
    } catch (error) {
        console.log(error);
        throw new BadRequestError("Invalid Request");
    }
};
