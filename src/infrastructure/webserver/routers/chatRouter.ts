import express, { Request, Response, NextFunction } from "express";
import { chatAdapter } from "./injectons/chatInjection";
const router = express.Router();

/**
 * @route  POST api/chat/conversation
 * @desc   SenderId and ReceiverId Used to Generate COnversation.
 * @access Public
 */
router.post(
    '/conversation',
    (req:Request, res:Response, next:NextFunction) => {
        chatAdapter.createConversation(req, res, next)
    });


/**
 * @route  POST api/chat/createMessage
 * @desc   SenderId Based to create New messages.
 * @access Public
 */
router.post(
    '/createMessage',
    (req:Request, res:Response, next:NextFunction) => {
        chatAdapter.createMessage(req, res, next)
    })

/**
 * @route  POST api/chat/:conversationId/viewMessage
 * @desc   Route to Retrieve Conversation Messages Based on ConversationId.
 * @access Public
 */
router.get(
    '/:conversationId/viewMessage',
    (req:Request, res:Response, next:NextFunction) => {
        chatAdapter.viewMessage(req, res, next)
    })

/**
 * @route  POST api/chat/worker/:workerId
 * @desc   Route to Retrieve Messages Based on WorkerId.
 * @access Public
 */
router.get(
    '/worker/:workerId',
    (req:Request, res:Response, next:NextFunction) => {
        chatAdapter.viewWorker(req, res, next)
    })

/**
 * @route  POST api/chat/user/:userId'
 * @desc   Route to Retrieve Messages Based on userId.
 * @access Public
 */
router.get(
    '/user/:userId',
    (req:Request, res:Response, next:NextFunction) => {
        chatAdapter.viewUser(req, res, next)
    })

export default router