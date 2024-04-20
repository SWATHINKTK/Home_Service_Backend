import { IUser } from "../../../domainLayer/user";
import { IUserRepository } from "../../interface/repository/IUserRepository";

export const createUser = async(
    userRepository:IUserRepository,
    firstname:string,
    lastname:string,
    district:string,
    email:string,
    phoneNumber:string,
    password:string
    
) => {
    const newUser = {
        firstname,
        lastname,
        district,
        email,
        phoneNumber,
        password
    }

    const createNewUser = await userRepository.createUser(newUser)
    return createNewUser;
}