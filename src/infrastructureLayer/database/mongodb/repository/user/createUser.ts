import { IUser } from "../../../../../domainLayer/user";
import { PublicUserInfo } from "../../../../../usecaseLayer/interface/services/IResponse";
import { userModel } from "../../models/userModel";

export const createUser = async(newUser:IUser, userModels: typeof userModel):Promise<PublicUserInfo> => {
        const user = await userModels.create(newUser);
        await user.save();

        const response:PublicUserInfo ={
            firstname:user.firstname,
            lastname:user.lastname,
            district:user.district,
            email:user.email,
            phoneNumber:user.phoneNumber,
        }
        return response;
}