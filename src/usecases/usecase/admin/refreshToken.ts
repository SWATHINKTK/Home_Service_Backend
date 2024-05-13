import { IServerResponse } from "../../../infrastructure/types/IResponse";
import { ForbiddenError } from "../../handler/forbiddenError";
import { UnauthorizedRequestError } from "../../handler/unauthorizedRequestError";
import { IJWT } from "../../interface/services/Ijwt";

export const refreshToken = async(adminRTkn:string, jwtService:IJWT):Promise<IServerResponse> => {
    try {
        const credential = jwtService.verifyJWT(adminRTkn);
        if(!credential){
            throw new UnauthorizedRequestError();
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