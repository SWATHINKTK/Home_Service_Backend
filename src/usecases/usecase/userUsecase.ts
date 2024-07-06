// Import necessary interfaces and functions
import { IAddress } from "../../domain/address";
import { IUser } from "../../domain/user";
import { IAddressRepository } from "../interface/repository/IAddressRepositry";
import { IUserRepository } from "../interface/repository/IUserRepository";
import { IEmailService } from "../interface/services/IEmailService";
import { IOTPService } from "../interface/services/IOTPService";
import { IRequestValidator } from "../interface/services/IRequestValidator";
import { ISecretHasher } from "../interface/services/ISecretHasher";
import { IJWT } from "../interface/services/Ijwt";
import { createNewAddress } from "./address/createNewAddress";
import { findAllAddress } from "./address/findAllAddress";
import { createUser } from "./user/createUser";
import { editUserProfile } from "./user/editUser";
import { getUser } from "./user/getUser";
import { googleSignin } from "./user/googleSigin";
import { loginUser } from "./user/loginUser";
import { logout } from "./user/logout";
import { refreshToken } from "./user/refreshToken";
import { sendOTP } from "./user/sendOTP";


export class UserUseCase {

    private readonly _userRepository: IUserRepository;
    private readonly _addressRepository: IAddressRepository;
    private readonly _emailService: IEmailService;
    private readonly _otpService: IOTPService;
    private readonly _secretHashService: ISecretHasher;
    private readonly _jwtService: IJWT;
    private readonly _requestValidator: IRequestValidator;

    constructor(
        userRepository: IUserRepository,
        addressRepository: IAddressRepository,
        emailService: IEmailService,
        otpService: IOTPService,
        secretHashService: ISecretHasher,
        jwtService: IJWT,
        requestValidator: IRequestValidator
    ) {
        this._userRepository = userRepository;
        this._addressRepository = addressRepository;
        this._emailService = emailService;
        this._otpService = otpService;
        this._secretHashService = secretHashService;
        this._jwtService = jwtService;
        this._requestValidator = requestValidator;
    }


    async createUser({ firstname, lastname, email, phoneNumber, district, password, userEnteredOTP, }: IUser & { userEnteredOTP: string }) {
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


    async sendOTP({ email, firstname, lastname }: { email: string; firstname: string; lastname: string; }) {

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


    async loginUser({ username, password }: { username: string; password: string; }) {

        //* Invokes the loginUser function with provided data and services.
        return loginUser(
            this._userRepository,
            this._secretHashService,
            this._jwtService,
            username,
            password
        );
    }

    async refreshToken(userRTkn: string) {
        return refreshToken(userRTkn, this._userRepository, this._jwtService)
    }

    async googleSignin({ firstname, lastname, email, phoneNumber, district, password }: IUser) {
        return googleSignin(firstname, lastname, email, phoneNumber, district, password, this._userRepository)
    }


    async logoutUser() {
        return logout();
    }


    async getUser(userEmail: string) {
        return getUser({ email: userEmail }, this._userRepository)
    }


    async editUserProfile(userEmail: string, { firstname, lastname, phoneNumber, district, }: IUser, userImage: { [fieldname: string]: Express.Multer.File[]; }) {
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


    async createNewAddress(newAddress: IAddress, userId:string) {
        return createNewAddress(newAddress, userId, this._addressRepository, this._requestValidator)
    }

    async retrieveAllAddress(userId:string){
        return findAllAddress(userId,this._addressRepository)
    }

}
