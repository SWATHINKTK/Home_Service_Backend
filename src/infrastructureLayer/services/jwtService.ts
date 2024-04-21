import jwt from "jsonwebtoken";
import { IJWT } from "../../usecaseLayer/interface/services/Ijwt";
import { BadRequestError } from "../../usecaseLayer/handler/badRequestError";


export class JWTService implements IJWT{
    
    createJWT(userId: string, email: string, role: string): string {
        const jwtKey = process.env.JWT_KEY;
        if(jwtKey){
            const token:string = jwt.sign( { userId,email,role }, jwtKey, { expiresIn:24 * 60 * 60 * 1000 });
            return token;
        }
        throw new BadRequestError('JWT Error');
    }

}