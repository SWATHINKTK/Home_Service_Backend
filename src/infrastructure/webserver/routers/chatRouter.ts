import express, { Request, Response, NextFunction } from "express";
import { chatAdapter } from "./injectons/chatInjection";
const router = express.Router();

// create Conversation
router.post(
    '/conversation',
    (req:Request, res:Response, next:NextFunction) => {
        chatAdapter.createConversation(req, res, next)
    }
)



// create message
router.post(
    '/createMessage',
    (req:Request, res:Response, next:NextFunction) => {
        chatAdapter.createMessage(req, res, next)
    }
)

// view message
router.get(
    '/:conversationId/viewMessage',
    (req:Request, res:Response, next:NextFunction) => {
        chatAdapter.viewMessage(req, res, next)
    }
)

// view Worker
router.get(
    '/worker/:workerId',
    (req:Request, res:Response, next:NextFunction) => {
        chatAdapter.viewWorker(req, res, next)
    }
)

// view user
router.get(
    '/user/:userId',
    (req:Request, res:Response, next:NextFunction) => {
        chatAdapter.viewUser(req, res, next)
    }
)

export default router