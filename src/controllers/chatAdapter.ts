import { profile } from "winston";
import { Next, Req, Res } from "../infrastructure/types/expressTypes";
import { ChatUseCase } from "../usecases/usecase/chatUseCase";

export class ChatAdapter{
    private readonly _chatUseCase:ChatUseCase;
    constructor(chatUsecase:ChatUseCase){
        this._chatUseCase = chatUsecase;
    }


    async createConversation(req:Req, res:Res, next:Next){
        try {
            const createConversation = await this._chatUseCase.createConversation(req.body);
            res.status(createConversation.statusCode).json(createConversation);
        } catch (error) {
            next(error)
        }
    }

    async createMessage(req:Req, res:Res, next:Next){
        try {
            const newMessage = await this._chatUseCase.createMessage(req.body);
            res.status(newMessage.statusCode).json(newMessage);
        } catch (error) {
           next(error) ;
        }
    }

    async viewMessage(req:Req, res:Res, next:Next){
        try {
            const newMessage = await this._chatUseCase.viewMessage(req.params.conversationId);
            res.status(newMessage.statusCode).json(newMessage);
        } catch (error) {
           next(error) ;
        }
    }

    async viewWorker(req:Req, res:Res, next:Next){
        try {
            const worker = await this._chatUseCase.viewWorker(req.params.workerId);
            res.status(worker.statusCode).json({
                success:true,
                message:'Worker Data Retrieved',
                data:{
                    username:worker.data.username,
                    profile:worker.data.profile || ''
                }
            });
        } catch (error) {
           next(error) ;
        }
    }

    async viewUser(req:Req, res:Res, next:Next){
        try {
            const user = await this._chatUseCase.viewUser(req.params.userId);
            res.status(user.statusCode).json({
                success:true,
                message:'Worker Data Retrieved',
                data:{
                    username:user.data.firstname + ' ' + user.data.lastname,
                    profile:user.data.profile || ''
                }
            });
        } catch (error) {
           next(error) ;
        }
    }
}