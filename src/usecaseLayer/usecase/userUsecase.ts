import { IUser } from "../../domainLayer/user";
import { IUserRepository } from "../interface/repository/IUserRepository";
import { createUser } from "./user/createUser";



export class UserUseCase{

    private readonly userRepository:IUserRepository

    constructor(userRepository:IUserRepository ){
        this.userRepository = userRepository
    }

    async createUser({ firstname, lastname, email, phoneNumber, district, password }:IUser){
        return createUser(
            this.userRepository,
            firstname,
            lastname,
            email,
            phoneNumber,
            district,
            password
        );
    }

 
}