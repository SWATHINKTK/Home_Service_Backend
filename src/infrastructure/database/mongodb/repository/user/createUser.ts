import { IUser } from "../../../../../domain/user";
import { PublicUserInfo } from "../../../../../usecases/interface/services/IResponse";
import { userModel } from "../../models/userModel";

export const createUser = async(newUser:IUser, userModelInstance: typeof userModel):Promise<PublicUserInfo> => {
        console.log("REpo",newUser)
        const user = await userModelInstance.create(newUser);
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