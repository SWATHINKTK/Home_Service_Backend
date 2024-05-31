import { IServerResponse } from "../../../infrastructure/types/IResponse";
import { ForbiddenError } from "../../handler/forbiddenError";
import { UnauthorizedRequestError } from "../../handler/unauthorizedRequestError";
import { IWorkerRepository } from "../../interface/repository/IWorkerRepository";
import { IJWT } from "../../interface/services/Ijwt";

export const refreshToken = async(workerRTkn:string, workerRepository:IWorkerRepository, jwtService:IJWT):Promise<IServerResponse> => {
    try {
        const credential = jwtService.verifyJWT(workerRTkn);
        console.log(credential)
        if(!credential){
            throw new UnauthorizedRequestError('Unauthorized Request.');
        }
        const worker = await workerRepository.findWorker({phoneNumber:credential.phoneNumber});
        console.log(worker)
        if(!worker || worker?._isBlocked){
            throw new ForbiddenError();
        }
        const tokenCredential = {
            _id:credential._id,
            phoneNumber:credential.phoneNumber,
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