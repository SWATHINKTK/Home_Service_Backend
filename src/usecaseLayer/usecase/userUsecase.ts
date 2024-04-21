import { IUser } from "../../domainLayer/user";
import { IUserRepository } from "../interface/repository/IUserRepository";
import { IEmailService } from "../interface/services/IEmailService";
import { IOTPService } from "../interface/services/IOTPService";
import { ISecretHasher } from "../interface/services/ISecretHasher";
import { createUser } from "./user/createUser";
import { sendOTP } from "./user/sendOTP";



export class UserUseCase{

    private readonly userRepository:IUserRepository;
    private readonly emailService:IEmailService; 
    private readonly otpService:IOTPService;
    private readonly secretHashService:ISecretHasher;

    constructor( userRepository:IUserRepository, emailService:IEmailService, otpService:IOTPService,secretHashService:ISecretHasher ){
        this.userRepository = userRepository;
        this.emailService = emailService;
        this.otpService = otpService;
        this.secretHashService = secretHashService
    }

    async createUser({ firstname, lastname, email, phoneNumber, district, password, userEnteredOTP  }:IUser & { userEnteredOTP :string }){
        return createUser(
            this.userRepository,
            this.secretHashService,
            this.otpService,
            firstname,
            lastname,
            email,
            phoneNumber,
            district,
            password,
            userEnteredOTP
        );
    }


    async sendOTP({ email, firstname, lastname }:{email:string; firstname:string; lastname:string;}){
        return sendOTP(
            firstname,
            lastname,
            email,
            this.userRepository,
            this.emailService,
            this.otpService,
            this.secretHashService
        )
    }

    // async loginUser( { username, password }:{username:string, passwor}){

    // }
    

 
}