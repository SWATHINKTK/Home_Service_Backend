import { SESClient, SESClientConfig, SendEmailCommand } from "@aws-sdk/client-ses";
import { BadRequestError } from '../../usecaseLayer/handler/badRequestError';
import { IEmailService } from '../../usecaseLayer/interface/services/IEmailService';

export class EmailService implements IEmailService{

    private sesClient: SESClient;
    constructor(){
        const sesClientConfig: SESClientConfig = {
            region: process.env.AWS_REGION,
            credentials: {
                accessKeyId: process.env.AWS_ACCESSKEY_ID || '',
                secretAccessKey: process.env.AWS_SECRET_ACCESSKEY_ID || ''
            }
        };


        console.log(sesClientConfig)

        // Create an instance of the SES client
        this.sesClient = new SESClient(sesClientConfig);
    }

    // function for sending email
    async sendEmail( recipient:string, subject:string, htmlBody:string ) : Promise<{ message: string }>{
        console.log("Email ENV",process.env.AWS_ACCESSKEY_ID,process.env.AWS_SECRET_ACCESSKEY_ID,process.env.AWS_REGION)


        // configuring the parameter for the email
        const params = {
            Destination: {
              ToAddresses: [recipient]
            },
            Message: {
              Body: {
                Html: {
                  Data: htmlBody
                }
              },
              Subject: {
                Data: subject
              }
            },
            Source: 'swathinktk10@gmail.com'
          };

          
        // Sending Email
        try {
            const data = await this.sesClient.send(new SendEmailCommand(params));
            console.log('Email Sending Successful')
            return { message: 'Email Sending Successful' };
        } catch (error) {
            console.log(error)
            throw new BadRequestError('Email sending error')
        }
        
    }
}