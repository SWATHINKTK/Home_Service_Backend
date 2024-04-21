export interface IEmailService{
    sendEmail(recipient:string, subject:string, htmlBody:string):Promise<{message:string}>
}