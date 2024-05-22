import jwt from "jsonwebtoken";
import { IJWT } from "../../usecases/interface/services/Ijwt";
import { BadRequestError } from "../../usecases/handler/badRequestError";
import { IDecodedToken } from "../types/jwtDecode";


export class JWTService implements IJWT{
    
    createJWT(credential:Record<string, string>): {accessToken:string, refreshToken:string}{
        const jwtKey = process.env.JWT_KEY;
        if(jwtKey){
            const accessToken:string = jwt.sign( credential, jwtKey, { expiresIn: '4m'});
            const refreshToken:string = jwt.sign( credential, jwtKey, { expiresIn: '15d'});
            return {accessToken, refreshToken}
        }
        throw new BadRequestError('JWT Error');
    }


    verifyJWT(token: string): IDecodedToken {
        const decodedToken = jwt.verify(token, process.env.JWT_KEY as string) as IDecodedToken;
        return decodedToken;
    }

}