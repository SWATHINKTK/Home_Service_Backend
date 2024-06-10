import { ChatAdapter } from "../../../../controllers/chatAdapter";
import { ChatUseCase } from "../../../../usecases/usecase/chatUseCase";
import { conversationModel } from "../../../database/mongodb/models/conversationModel";
import { messageModel } from "../../../database/mongodb/models/messageModel";
import { ConversationRepository } from "../../../database/mongodb/repository/conversationRepository";
import { MessageRepository } from "../../../database/mongodb/repository/messageRepositry";
import { RequestValidator } from "../../../services/requestValidator";

const conversationRepository = new ConversationRepository(conversationModel);
const messageRepository = new MessageRepository(messageModel);
const requestValidator = new RequestValidator();

const chatUseCase = new ChatUseCase(conversationRepository, messageRepository, requestValidator);


export const chatAdapter = new ChatAdapter(chatUseCase);