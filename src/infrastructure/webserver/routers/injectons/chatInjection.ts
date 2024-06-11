import { ChatAdapter } from "../../../../controllers/chatAdapter";
import { ChatUseCase } from "../../../../usecases/usecase/chatUseCase";
import { conversationModel } from "../../../database/mongodb/models/conversationModel";
import { messageModel } from "../../../database/mongodb/models/messageModel";
import { userModel } from "../../../database/mongodb/models/userModel";
import { workerExtraInfoModel } from "../../../database/mongodb/models/workerExtraInfoModel";
import { workerModel } from "../../../database/mongodb/models/workerModel";
import { ConversationRepository } from "../../../database/mongodb/repository/conversationRepository";
import { MessageRepository } from "../../../database/mongodb/repository/messageRepositry";
import { UserRepository } from "../../../database/mongodb/repository/userRepository";
import { WorkerRepository } from "../../../database/mongodb/repository/workerRepository";
import { RequestValidator } from "../../../services/requestValidator";

const conversationRepository = new ConversationRepository(conversationModel);
const messageRepository = new MessageRepository(messageModel);
const userRepository = new UserRepository(userModel);
const workerRepository = new WorkerRepository(workerModel, workerExtraInfoModel)
const requestValidator = new RequestValidator();

const chatUseCase = new ChatUseCase(conversationRepository, messageRepository, userRepository, workerRepository, requestValidator);


export const chatAdapter = new ChatAdapter(chatUseCase);