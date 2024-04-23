import { IUser } from "../../domainLayer/user";
import { IUserRepository } from "../interface/repository/IUserRepository";
import { IEmailService } from "../interface/services/IEmailService";
import { IOTPService } from "../interface/services/IOTPService";
import { ISecretHasher } from "../interface/services/ISecretHasher";
import { IJWT } from "../interface/services/Ijwt";
import { createUser } from "./user/createUser";
import { loginUser } from "./user/loginUser";
import { logout } from "./user/logout";
import { sendOTP } from "./user/sendOTP";



export class UserUseCase{

    private readonly userRepository:IUserRepository;
    private readonly emailService:IEmailService; 
    private readonly otpService:IOTPService;
    private readonly secretHashService:ISecretHasher;
    private readonly jwtService:IJWT;

    constructor( userRepository:IUserRepository, emailService:IEmailService, otpService:IOTPService,secretHashService:ISecretHasher, jwtService:IJWT ){
        this.userRepository = userRepository;
        this.emailService = emailService;
        this.otpService = otpService;
        this.secretHashService = secretHashService;
        this.jwtService = jwtService;
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

    async loginUser( { username, password }:{username:string, password:string}){
        return loginUser(
            this.userRepository,
            this.secretHashService,
            this.jwtService,
            username,
            password
        )
    }

    async logoutUser(){
        return logout()
    }
    

 
}