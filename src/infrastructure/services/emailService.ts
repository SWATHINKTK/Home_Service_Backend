import nodemailer from 'nodemailer';
import { BadRequestError } from '../../usecases/handler/badRequestError';
import { IEmailService } from '../../usecases/interface/services/IEmailService';


export class EmailService implements IEmailService{

    constructor(){
    }

    // function for sending email
    async sendEmail( recipient:string, subject:string, htmlBody:string ) : Promise<{ message: string }>{
        try {
            const transporter = nodemailer.createTransport({
                host: 'smtp.gmail.com',
                port: 465,
                secure: true,
                requireTLS: true,
                auth: {
                    user: 'swathinktk10@gmail.com',
                    pass: process.env.SMTP_PASSWORD
                }
            });
    
            const mailOptions = {
                from: "swathinktk10@gmail.com",
                to: recipient,
                subject: subject,
                html: htmlBody
            }
    
            // Sending email using async/await
            const info = await transporter.sendMail(mailOptions);

            console.log('Email Sending Successful', info.response);
            return { message: 'Email Sending Successful' };
        } catch (error) {
            throw new BadRequestError('Email sending error');
        }
    }
}