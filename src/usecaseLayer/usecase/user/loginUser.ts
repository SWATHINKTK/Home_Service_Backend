import { BadRequestError } from "../../handler/badRequestError";
import { IUserRepository } from "../../interface/repository/IUserRepository";
import { IServerResponse } from "../../interface/services/IResponse";
import { ISecretHasher } from "../../interface/services/ISecretHasher";
import { IJWT } from "../../interface/services/Ijwt";

export const loginUser = async(
  userRepository: IUserRepository,
  secretHashService: ISecretHasher,
  jwtService: IJWT,
  username: string,
  password: string
):Promise<IServerResponse> => {
    try {
        const existingUser = await userRepository.findUser(username);
        if(!existingUser){
            throw new BadRequestError('Invalid user data')
        }

        const checkCredentials = await secretHashService.checkSecretMatch(password,existingUser.password);
        if(!checkCredentials){
            throw new BadRequestError('Invalid user data.Please Check email & password.')
        }


        const token = await jwtService.createJWT( existingUser._id, username, "User");
        existingUser.password = '';

        return {
            statusCode:200,
            success:true,
            message:'User Logged Successfully',
            data:existingUser,
            token:token
        }
    } catch (error) {
        throw error;
    }
};
