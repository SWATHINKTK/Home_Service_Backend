import { IUserRepository } from "../interface/repository/IUserRepository";
import { findAllUsers } from "./user/findAllUser";

export class UserUsecaseAdmin{

    private readonly userRepository:IUserRepository;
    constructor(userRepository:IUserRepository){
        this.userRepository = userRepository
    }

    async findAllUsers(){
        return findAllUsers(this.userRepository);
    }

}