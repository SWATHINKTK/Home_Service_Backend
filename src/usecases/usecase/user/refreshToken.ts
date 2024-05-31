import { IServerResponse } from "../../../infrastructure/types/IResponse";
import { ForbiddenError } from "../../handler/forbiddenError";
import { UnauthorizedRequestError } from "../../handler/unauthorizedRequestError";
import { IUserRepository } from "../../interface/repository/IUserRepository";
import { IJWT } from "../../interface/services/Ijwt";

export const refreshToken = async(userRToken:string, userRepository:IUserRepository, jwtService:IJWT):Promise<IServerResponse> => {
    try {
        const credential = jwtService.verifyJWT(userRToken);
        if(!credential){
            throw new UnauthorizedRequestError('Unauthorized Request.');
        }
        const user = await userRepository.findUser(credential.email);
        if(!user || user?._isBlocked){
            throw new ForbiddenError();
        }
        const tokenCredential = {
            _id:credential._id,
            email:credential.email,
            role:credential.role
        }

        const newTokens = jwtService.createJWT(tokenCredential);
        
        return {
            statusCode:200,
            success:true,
            token:newTokens
        }
    } catch (error) {
        console.log('refresh Error',error)
        throw error;
    }
}