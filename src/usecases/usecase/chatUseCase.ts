import { IConversationRepository } from "../interface/repository/IConversationRepository";
import { IMessageRepository } from "../interface/repository/IMessageRepository";
import { IUserRepository } from "../interface/repository/IUserRepository";
import { IWorkerRepository } from "../interface/repository/IWorkerRepository";
import { IRequestValidator } from "../interface/services/IRequestValidator";
import { createConversation } from "./chat/createConversation";
import { createMessage } from "./chat/createMessage";
import { viewMessage } from "./chat/viewMessage";
import { getUser } from "./user/getUser";
import { getWorkerProfile } from "./worker/getWorkerProfile";

export class ChatUseCase{
    private readonly _conversationRepository:IConversationRepository;
    private readonly _messageRepository:IMessageRepository;
    private readonly _userRepository: IUserRepository;
    private readonly _workerRepository: IWorkerRepository;
    private readonly _requestValidator:IRequestValidator;
    constructor(
        conversationRepository:IConversationRepository, 
        messageRepository:IMessageRepository, 
        userRepository:IUserRepository,
        workerRepository:IWorkerRepository,
        requestValidator:IRequestValidator
    ){
        this._conversationRepository = conversationRepository;
        this._messageRepository = messageRepository;
        this._userRepository = userRepository;
        this._workerRepository = workerRepository;
        this._requestValidator = requestValidator;
    }

    async createConversation({senderId, receiverId}:{senderId:string, receiverId:string}){
        return createConversation(senderId,receiverId, this._conversationRepository, this._requestValidator)
    }

    async createMessage({text, senderId, receiverId, conversationId}:{text:string, senderId:string, receiverId:string, conversationId:string}){
        return createMessage(text, senderId, receiverId, conversationId, this._messageRepository, this._requestValidator);
    }

    async viewMessage(conversationId:string){
        return viewMessage(conversationId, this._messageRepository, this._requestValidator)
    }

    async viewWorker(workerId:string){
        return getWorkerProfile(workerId, this._workerRepository)
    }

    async viewUser(userId:string){
        return getUser({_id:userId}, this._userRepository);
    }

}