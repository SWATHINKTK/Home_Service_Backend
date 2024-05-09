// Import necessary interfaces and functions
import { IUser } from "../../domain/user";
import { IUserRepository } from "../interface/repository/IUserRepository";
import { IEmailService } from "../interface/services/IEmailService";
import { IOTPService } from "../interface/services/IOTPService";
import { ISecretHasher } from "../interface/services/ISecretHasher";
import { IJWT } from "../interface/services/Ijwt";
import { createUser } from "./user/createUser";
import { editUserProfile } from "./user/editUser";
import { getUser } from "./user/getUser";
import { loginUser } from "./user/loginUser";
import { logout } from "./user/logout";
import { sendOTP } from "./user/sendOTP";


/**
 * ! Handles user-related use cases such as registration, authentication, and logout.
 */
export class UserUseCase {

    private readonly _userRepository: IUserRepository;
    private readonly _emailService: IEmailService;
    private readonly _otpService: IOTPService;
    private readonly _secretHashService: ISecretHasher;
    private readonly _jwtService: IJWT;


    /**
     * ! Constructs a new instance of the UserService class.
     * 
     * @param  _userRepository - The repository for user data.
     * @param  _emailService - The service used for sending emails.
     * @param  _otpService - The service used for OTP (One-Time Password) generation and verification.
     * @param  _secretHashService - The service used for hashing sensitive data like passwords.
     * @param  _jwtService - The service used for JWT (JSON Web Token) generation and verification.
     */
    constructor(
        userRepository: IUserRepository,
        emailService: IEmailService,
        otpService: IOTPService,
        secretHashService: ISecretHasher,
        jwtService: IJWT
    ) {
        this._userRepository = userRepository;
        this._emailService = emailService;
        this._otpService = otpService;
        this._secretHashService = secretHashService;
        this._jwtService = jwtService;
    }


    /**
     * ! Creates a new user.
     * 
     * @param firstname first name of the user.
     * @param lastname last name of the user.
     * @param email email address of the user.
     * @param phoneNumber phone number of the user.
     * @param district User's district.
     * @param password User's chosen password.
     * @param userEnteredOTP OTP for user verification.
     * 
     * @returns A promise resolving when user creation is complete.
     */
    async createUser({
        firstname,
        lastname,
        email,
        phoneNumber,
        district,
        password,
        userEnteredOTP,
    }: IUser & { userEnteredOTP: string }) {

        // * Invoke createUser function with provided data and services.
        return createUser(
            this._userRepository,
            this._secretHashService,
            this._otpService,
            firstname,
            lastname,
            email,
            phoneNumber,
            district,
            password,
            userEnteredOTP
        );
    }


    /**
     * ! Send OTP For User Verification.
     * 
     * @param email email address of the user.
     * @param firstname first name of the user.
     * @param lastname last name of the user.
     * 
     * @returns A promise resolving when user verification otp sending is completed.
     */
    async sendOTP({
        email,
        firstname,
        lastname,
    }: {
        email: string;
        firstname: string;
        lastname: string;
    }) {

        // * Invoke sendOTP function with provided data and services.
        return sendOTP(
            firstname,
            lastname,
            email,
            this._userRepository,
            this._emailService,
            this._otpService,
            this._secretHashService
        );
    }


    /**
    * ! User Credential Data is Used to Login.
    * 
    * @param username - The username or email of the user.
    * @param password - The password for the user account.
    * 
    * @returns A promise resolving with the user data upon successful login.
    */
    async loginUser({
        username,
        password,
    }: {
        username: string;
        password: string;
        }) {
        
        //* Invokes the loginUser function with provided data and services.
        return loginUser(
            this._userRepository,
            this._secretHashService,
            this._jwtService,
            username,
            password
        );
    }


    /**
     * ! Logs out the current user.
     * 
     * @returns  A promise indicating that the user has been successfully logged out.
     */
    async logoutUser() {
        //* Invoke the logout function to perform user logout.
        return logout();
    }


    async getUser(userEmail:string){
        return getUser(userEmail, this._userRepository)
    }


    async editUserProfile(userEmail:string,{firstname, lastname, phoneNumber, district,}:IUser,userImage: { [fieldname: string]: Express.Multer.File[]; }){
        return editUserProfile(
            userEmail,
            firstname,
            lastname,
            phoneNumber,
            district,
            userImage,
            this._userRepository
        )
    }
}
