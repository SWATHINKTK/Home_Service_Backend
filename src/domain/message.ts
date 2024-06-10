export interface IMessage{
    conversationId:string;
    sender:string;
    receiver:string;
    text:string;
    status?:boolean;
}